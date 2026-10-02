type Props = { label: string; value: string | number; hint?: string };

export function StatCard({ label, value, hint }: Props) {
  return <section><span>{label}</span><strong>{value}</strong>{hint && <small>{hint}</small>}</section>;
}
