import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function POST(request: Request) {
  try {
    const { name, email, phone, subject, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      );
    }

    // 1. Save to database
    const contact = await prisma.contactMessage.create({
      data: { name, email, phone, subject, message },
    });

    // 2. Send email via Resend (lazy-loaded so build doesn't fail)
    const apiKey = process.env.RESEND_API_KEY;
    if (apiKey) {
      try {
        const resend = new Resend(apiKey);
        await resend.emails.send({
          from: 'ASFT Website <onboarding@resend.dev>',
          to: process.env.CONTACT_EMAIL || 'aramsaeivom@gmail.com',
          replyTo: email,
          subject: subject || `New message from ${name}`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #0a1628; border-bottom: 2px solid #C9A227; padding-bottom: 10px;">
                New Contact Form Submission
              </h2>
              <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
                <tr><td style="padding: 8px 0; font-weight: bold;">Name:</td><td>${name}</td></tr>
                <tr><td style="padding: 8px 0; font-weight: bold;">Email:</td><td>${email}</td></tr>
                ${phone ? `<tr><td style="padding: 8px 0; font-weight: bold;">Phone:</td><td>${phone}</td></tr>` : ''}
                ${subject ? `<tr><td style="padding: 8px 0; font-weight: bold;">Subject:</td><td>${subject}</td></tr>` : ''}
              </table>
              <hr style="margin: 20px 0; border: none; border-top: 1px solid #eee;" />
              <p style="white-space: pre-wrap; line-height: 1.6;">${message}</p>
              <hr style="margin: 20px 0; border: none; border-top: 1px solid #eee;" />
              <p style="color: #999; font-size: 12px;">
                Sent from the Aram Saeivom Family Trust website contact form.
              </p>
            </div>
          `,
        });
      } catch (emailError) {
        console.error('Email send failed:', emailError);
        // Message is already saved — don't fail the request
      }
    } else {
      console.warn('RESEND_API_KEY not set — skipping email');
    }

    return NextResponse.json(
      { success: true, message: 'Your message has been sent!', id: contact.id },
      { status: 201 }
    );
  } catch (error) {
    console.error('Contact error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}