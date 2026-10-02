export type Session = { id: string; userId: string; expiresAt: Date };

export function createSession(userId: string, ttlMs = 1000 * 60 * 60 * 24 * 7): Session {
  return { id: crypto.randomUUID(), userId, expiresAt: new Date(Date.now() + ttlMs) };
}

export function isSessionValid(session: Session, now = new Date()): boolean {
  return session.expiresAt.getTime() > now.getTime();
}
