export type Role = "user" | "admin";

export function hasRole(role: Role | null | undefined, allowed: readonly Role[]): boolean {
  return !!role && allowed.includes(role);
}

export function requireRole(role: Role | null | undefined, allowed: readonly Role[]): void {
  if (!hasRole(role, allowed)) throw new Error("FORBIDDEN");
}
