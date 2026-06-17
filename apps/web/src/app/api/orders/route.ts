import { NextRequest, NextResponse } from 'next/server';
import Razorpay from 'razorpay';
import { z } from 'zod';
import { rateLimit } from '@/lib/rate-limit';

const orderSchema = z.object({
  amount:      z.number().min(1).max(1000000),
  currency:    z.string().default('INR'),
  campaignId:  z.string().optional(),
  donorEmail:  z.string().email().optional(),
  donorName:   z.string().min(1).optional(),
});

export async function POST(req: NextRequest) {
  // Rate limiting
  const ip = req.headers.get('x-forwarded-for') ?? 'unknown';
  const limited = await rateLimit(ip, 10, 60);
  if (limited) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
  }

  try {
    const body = await req.json();
    const data = orderSchema.parse(body);

    if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
      return NextResponse.json(
        { error: 'Payment gateway is not configured' },
        { status: 503 }
      );
    }

    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const order = await razorpay.orders.create({
      amount:   data.amount * 100, // paise
      currency: data.currency,
      receipt:  `rcpt_${Date.now()}`,
      notes: {
        campaignId: data.campaignId ?? '',
        donorEmail: data.donorEmail ?? '',
        donorName:  data.donorName  ?? '',
      },
    });

    // Pre-create donation record as PENDING (uncomment when database is ready)
    /*
    if (data.donorEmail && data.donorName) {
      await prisma.donation.create({
        data: {
          donorName:      data.donorName,
          donorEmail:     data.donorEmail,
          amount:         data.amount,
          currency:       data.currency,
          campaignId:     data.campaignId,
          razorpayOrderId: order.id,
          status:         'PENDING',
        },
      });
    }
    */
    return NextResponse.json({
      orderId:     order.id,
      razorpayKey: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount:      data.amount,
      currency:    data.currency,
    });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.errors }, { status: 400 });
    }
    console.error('Order creation error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}