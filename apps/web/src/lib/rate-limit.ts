const rateLimitMap = new Map<string, { count: number; timestamp: number }>();

export async function rateLimit(
  key: string,
  maxRequests: number,
  windowSeconds: number
): Promise<boolean> {
  const now    = Date.now();
  const window = windowSeconds * 1000;
  const entry  = rateLimitMap.get(key);

  if (!entry || now - entry.timestamp > window) {
    rateLimitMap.set(key, { count: 1, timestamp: now });
    return false; // not limited
  }

  if (entry.count >= maxRequests) {
    return true; // limited
  }

  entry.count++;
  return false;
}