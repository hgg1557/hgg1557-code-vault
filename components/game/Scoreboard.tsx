type Score = { label: string; value: number | string };
type Props = { scores: Score[]; className?: string };

export function Scoreboard({ scores, className = "" }: Props) {
  return <div className={className} role="status">{scores.map((s) => <div key={s.label}><span>{s.label}</span><strong>{s.value}</strong></div>)}</div>;
}
