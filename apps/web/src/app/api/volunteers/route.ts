import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const volunteerSchema = z.object({
  name:         z.string().min(2).max(100),
  email:        z.string().email(),
  phone:        z.string().min(10).max(15),
  availability: z.string().min(1),
  notes:        z.string().optional(),
  eventId:      z.string().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = volunteerSchema.parse(body);

    const volunteer = await prisma.volunteer.create({
      data: {
        name:            data.name,
        email:           data.email,
        phone:           data.phone,
        availability:    data.availability,
        notes:           data.notes,
        assignedEventId: data.eventId,
      },
    });

    return NextResponse.json({ success: true, id: volunteer.id }, { status: 201 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.errors }, { status: 400 });
    }
    console.error('POST /api/volunteers error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
