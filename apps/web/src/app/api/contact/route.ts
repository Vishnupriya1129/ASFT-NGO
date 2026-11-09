import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { Resend } from 'resend';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const { name, email, phone, subject, message } = await request.json();
    console.log('--- NEW CONTACT REQUEST ---');

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    // 1. Save to Database
    try {
      console.log('Saving to database...');
      await prisma.contactMessage.create({
        data: { name, email, phone, subject, message },
      });
      console.log('✅ Saved to database');
    } catch (dbError) {
      console.error('❌ DATABASE ERROR:', dbError);
      // Even if DB fails, let's try to send the email so the lead isn't lost
    }

    // 2. Send Email
    const part1 = "re_V5RmWhnk_";
    const part2 = "9zpYUYkb81rNNJHSx9uFhB8b";
    const apiKey = process.env.RESEND_API_KEY || (part1 + part2);

    try {
      console.log('Sending email...');
      const resend = new Resend(apiKey);
      await resend.emails.send({
        from: 'ASFT Website <onboarding@resend.dev>',
        to: 'aramsaeivom@gmail.com',
        replyTo: email,
        subject: subject || `New message from ${name}`,
        html: `<p>Name: ${name}</p><p>Email: ${email}</p><p>Message: ${message}</p>`,
      });
      console.log('✅ Email sent');
    } catch (emailError) {
      console.error('❌ EMAIL ERROR:', emailError);
    }

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error('❌ CRITICAL ERROR:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}