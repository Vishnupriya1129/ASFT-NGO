import crypto from 'crypto';

jest.mock('@/lib/prisma', () => ({
  prisma: {
    donation: {
      update:      jest.fn().mockResolvedValue({ id: 'don_1', donorEmail: 'test@test.com', donorName: 'Test', amount: 500, currency: 'INR', campaignId: null, receiptSent: false }),
      updateMany:  jest.fn().mockResolvedValue({ count: 1 }),
    },
    campaign: { update: jest.fn().mockResolvedValue({}) },
  },
}));

jest.mock('@/lib/email',  () => ({ sendReceiptEmail: jest.fn().mockResolvedValue(true) }));
jest.mock('@/lib/audit',  () => ({ auditLog: jest.fn().mockResolvedValue(true) }));

const WEBHOOK_SECRET = 'test_webhook_secret';
process.env.RAZORPAY_WEBHOOK_SECRET = WEBHOOK_SECRET;

function signPayload(body: string) {
  return crypto.createHmac('sha256', WEBHOOK_SECRET).update(body).digest('hex');
}

describe('POST /api/webhooks/razorpay', () => {
  it('accepts payment.captured with valid signature', async () => {
    const { POST } = await import('@/app/api/webhooks/razorpay/route');
    const payload = JSON.stringify({
      event: 'payment.captured',
      payload: {
        payment: { entity: { id: 'pay_123', order_id: 'order_123' } },
      },
    });
    const sig     = signPayload(payload);
    const request = new Request('http://localhost/api/webhooks/razorpay', {
      method: 'POST',
      headers: { 'x-razorpay-signature': sig, 'Content-Type': 'application/json' },
      body: payload,
    });
    const res = await POST(request as any);
    expect(res.status).toBe(200);
  });

  it('rejects requests with invalid signature', async () => {
    const { POST } = await import('@/app/api/webhooks/razorpay/route');
    const payload = JSON.stringify({ event: 'payment.captured', payload: {} });
    const request = new Request('http://localhost/api/webhooks/razorpay', {
      method: 'POST',
      headers: { 'x-razorpay-signature': 'invalid_sig', 'Content-Type': 'application/json' },
      body: payload,
    });
    const res = await POST(request as any);
    expect(res.status).toBe(400);
  });
});