export const isEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
export const isStrongPassword = (value: string) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(value);
export const isRequired = (value: unknown) => typeof value === "string" ? value.trim().length > 0 : value !== null && value !== undefined;
export const maxLength = (value: string, max: number) => value.length <= max;
