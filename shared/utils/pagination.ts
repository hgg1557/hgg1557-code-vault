export type PageResult<T> = { items: T[]; page: number; pageSize: number; total: number; totalPages: number };
export function paginate<T>(items: T[], page = 1, pageSize = 20): PageResult<T> {
  const safeSize = Math.max(1, pageSize);
  const total = items.length;
  const totalPages = Math.max(1, Math.ceil(total / safeSize));
  const safePage = Math.min(Math.max(1, page), totalPages);
  const start = (safePage - 1) * safeSize;
  return { items: items.slice(start, start + safeSize), page: safePage, pageSize: safeSize, total, totalPages };
}
