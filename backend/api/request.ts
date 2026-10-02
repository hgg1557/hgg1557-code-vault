export function getBearerToken(headers: Headers | Record<string, string | undefined>): string | null {
  const value = headers instanceof Headers ? headers.get("authorization") : headers.authorization ?? headers.Authorization;
  if (!value) return null;
  const match = value.match(/^Bearer\s+(.+)$/i);
  return match?.[1] ?? null;
}

export function getClientIp(headers: Headers | Record<string, string | undefined>): string | null {
  const value = headers instanceof Headers ? headers.get("x-forwarded-for") : headers["x-forwarded-for"];
  return value?.split(",")[0]?.trim() || null;
}
