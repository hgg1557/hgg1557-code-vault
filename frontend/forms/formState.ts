export type FieldErrors<T> = Partial<Record<keyof T, string>>;

export function hasErrors<T>(errors: FieldErrors<T>): boolean {
  return Object.values(errors).some(Boolean);
}

export function firstError<T>(errors: FieldErrors<T>): string | null {
  return (Object.values(errors).find(Boolean) as string | undefined) ?? null;
}
