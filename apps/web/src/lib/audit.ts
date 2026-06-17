import { prisma } from '@/lib/prisma';

interface AuditLogInput {
  userId:    string;
  action:    string;
  resource:  string;
  details?:  Record<string, any>;
  ipAddress?: string;
}

export async function auditLog(input: AuditLogInput) {
  try {
    await prisma.auditLog.create({
      data: {
        userId:    input.userId,
        action:    input.action,
        resource:  input.resource,
        details:   input.details,
        ipAddress: input.ipAddress,
      },
    });
  } catch (err) {
    // Non-fatal — log but don't throw
    console.error('Audit log failed:', err);
  }
}