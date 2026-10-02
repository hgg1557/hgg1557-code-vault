export type ApiError = { code: string; message: string; details?: unknown };
export function ok<T>(data: T, status = 200) {
  return { status, body: { success: true, data } };
}
export function fail(code: string, message: string, status = 400, details?: unknown) {
  const error: ApiError = { code, message, ...(details === undefined ? {} : { details }) };
  return { status, body: { success: false, error } };
}
