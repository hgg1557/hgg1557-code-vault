type Props = { open: boolean; title?: string; score?: number | string; onRestart: () => void };

export function GameOver({ open, title = "Game Over", score, onRestart }: Props) {
  if (!open) return null;
  return <div role="dialog" aria-modal="true"><h2>{title}</h2>{score !== undefined && <p>Score: {score}</p>}<button onClick={onRestart}>Play again</button></div>;
}
