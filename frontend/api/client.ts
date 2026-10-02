export type ApiResult<T> = { success: true; data: T } | { success: false; error: { code: string; message: string; details?: unknown } };

export async function apiRequest<T>(url: string, options: RequestInit = {}): Promise<ApiResult<T>> {
  const response = await fetch(url, {
    ...options,
    headers: { "Content-Type": "application/json", ...(options.headers || {}) },
    credentials: "include",
  });
  const body = await response.json().catch(() => null);
  if (!response.ok) {
    return { success: false, error: body?.error ?? { code: "HTTP_ERROR", message: response.statusText || "Request failed" } };
  }
  return body as ApiResult<T>;
}
