import type { AuthUser } from "./types";

export function canAccess(user: AuthUser | null, allowedRoles: readonly string[] = []): boolean {
  if (!user) return false;
  return allowedRoles.length === 0 || allowedRoles.includes(user.role);
}
