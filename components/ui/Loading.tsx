type Props = { label?: string; className?: string };

export function Loading({ label = "Loading…", className = "" }: Props) {
  return <div className={className} role="status" aria-live="polite">{label}</div>;
}
