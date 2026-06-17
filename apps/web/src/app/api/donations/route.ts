import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';
import { sendReceiptEmail } from '@/lib/email';

const donationSchema = z.object({
  razorpayOrderId:   z.string(),
  razorpayPaymentId: z.string(),
  razorpaySignature: z.string(),
  donorName:         z.string().min(1),
  donorEmail:        z.string().email(),
  amount:            z.number().min(1),
  campaignId:        z.string().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = donationSchema.parse(body);

    // Verify signature
    const generated = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET!)
      .update(`${data.razorpayOrderId}|${data.razorpayPaymentId}`)
      .digest('hex');

    if (generated !== data.razorpaySignature) {
      return NextResponse.json({ error: 'Invalid payment signature' }, { status: 400 });
    }

    // Upsert donation
    const donation = await prisma.donation.upsert({
      where:  { razorpayOrderId: data.razorpayOrderId },
      update: {
        razorpayPaymentId: data.razorpayPaymentId,
        status:            'SUCCESS',
      },
      create: {
        donorName:         data.donorName,
        donorEmail:        data.donorEmail,
        amount:            data.amount,
        currency:          'INR',
        campaignId:        data.campaignId,
        razorpayOrderId:   data.razorpayOrderId,
        razorpayPaymentId: data.razorpayPaymentId,
        status:            'SUCCESS',
      },
    });

    // Send receipt
    await sendReceiptEmail({
      to: donation.donorEmail, name: donation.donorName,
      amount: donation.amount, currency: donation.currency,
      paymentId: data.razorpayPaymentId,
    }).catch(console.error);

    return NextResponse.json({ success: true, donationId: donation.id });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.errors }, { status: 400 });
    }
    console.error('POST /api/donations error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}