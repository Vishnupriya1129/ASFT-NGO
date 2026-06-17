jest.mock('razorpay', () => {
  return jest.fn().mockImplementation(() => ({
    orders: {
      create: jest.fn().mockResolvedValue({
        id: 'order_test_123',
        amount: 50000,
        currency: 'INR',
        receipt: 'rcpt_test',
        notes: {},
      }),
    },
  }));
});

jest.mock('@/lib/prisma', () => ({
  prisma: {
    donation: { create: jest.fn().mockResolvedValue({ id: 'don_test_1' }) },
  },
}));

jest.mock('@/lib/rate-limit', () => ({
  rateLimit: jest.fn().mockResolvedValue(false),
}));

describe('POST /api/orders', () => {
  it('creates a Razorpay order for valid input', async () => {
    const { POST } = await import('@/app/api/orders/route');
    const request = new Request('http://localhost:3000/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-forwarded-for': '127.0.0.1' },
      body: JSON.stringify({ amount: 500, currency: 'INR', donorName: 'Test', donorEmail: 'test@test.com' }),
    });
    const response = await POST(request as any);
    const data = await response.json();
    expect(response.status).toBe(200);
    expect(data.orderId).toBe('order_test_123');
    expect(data.razorpayKey).toBeDefined();
  });

  it('rejects invalid amount', async () => {
    const { POST } = await import('@/app/api/orders/route');
    const request = new Request('http://localhost:3000/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-forwarded-for': '127.0.0.1' },
      body: JSON.stringify({ amount: -1, currency: 'INR' }),
    });
    const response = await POST(request as any);
    expect(response.status).toBe(400);
  });
});