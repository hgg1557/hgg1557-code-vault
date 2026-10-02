export function formatDate(value: string | number | Date, locale = "zh-CN"): string {
  return new Intl.DateTimeFormat(locale, { year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date(value));
}

export function formatDateTime(value: string | number | Date, locale = "zh-CN"): string {
  return new Intl.DateTimeFormat(locale, { dateStyle: "medium", timeStyle: "short" }).format(new Date(value));
}
