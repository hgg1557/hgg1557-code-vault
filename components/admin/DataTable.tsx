import type { ReactNode } from "react";

export type Column<T> = { key: string; header: string; render: (row: T) => ReactNode };

type Props<T> = { rows: T[]; columns: Column<T>[]; rowKey: (row: T) => string };

export function DataTable<T>({ rows, columns, rowKey }: Props<T>) {
  return (
    <table>
      <thead><tr>{columns.map(c => <th key={c.key}>{c.header}</th>)}</tr></thead>
      <tbody>{rows.map(row => <tr key={rowKey(row)}>{columns.map(c => <td key={c.key}>{c.render(row)}</td>)}</tr>)}</tbody>
    </table>
  );
}
