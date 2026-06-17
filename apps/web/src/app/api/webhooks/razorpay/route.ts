import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { prisma } from '@/lib/prisma';
import { sendReceiptEmail } from '@/lib/email';
import { auditLog } from '@/lib/audit';

export async function POST(req: NextRequest) {
  const rawBody   = await req.text();
  const signature = req.headers.get('x-razorpay-signature') ?? '';
  const secret    = process.env.RAZORPAY_WEBHOOK_SECRET!;

  // ── Signature verification ─────────────────────────────────
  const expectedSig = crypto
    .createHmac('sha256', secret)
    .update(rawBody)
    .digest('hex');

  if (expectedSig !== signature) {
    console.warn('Razorpay webhook: invalid signature');
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  const event = JSON.parse(rawBody);
  const { event: eventType, payload } = event;

  try {
    if (eventType === 'payment.captured') {
      const payment   = payload.payment.entity;
      const orderId   = payment.order_id;
      const paymentId = payment.id;

      const donation = await prisma.donation.update({
        where:  { razorpayOrderId: orderId },
        data: {
          razorpayPaymentId: paymentId,
          status:            'SUCCESS',
          updatedAt:         new Date(),
        },
      });

      // Send receipt email
      if (!donation.receiptSent) {
        await sendReceiptEmail({
          to:     donation.donorEmail,
          name:   donation.donorName,
          amount: donation.amount,
          currency: donation.currency,
          paymentId,
        });
        await prisma.donation.update({
          where: { id: donation.id },
          data:  { receiptSent: true },
        });
      }

      // Audit log
      await auditLog({
        userId:   'system',
        action:   'DONATION_SUCCESS',
        resource: 'donation',
        details:  { donationId: donation.id, amount: donation.amount },
      });

      // Update campaign raised amount
      if (donation.campaignId) {
        await prisma.campaign.update({
          where: { id: donation.campaignId },
          data:  { raisedAmount: { increment: donation.amount } },
        });
      }
    }

    if (eventType === 'payment.failed') {
      const payment = payload.payment.entity;
      await prisma.donation.updateMany({
        where:  { razorpayOrderId: payment.order_id },
        data:   { status: 'FAILED' },
      });
    }

    if (eventType === 'refund.created') {
      const payment = payload.payment.entity;
      await prisma.donation.updateMany({
        where:  { razorpayPaymentId: payment.id },
        data:   { status: 'REFUNDED' },
      });
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    console.error('Webhook processing error:', err);
    return NextResponse.json({ error: 'Processing failed' }, { status: 500 });
  }
}
