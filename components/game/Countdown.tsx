import { useEffect, useState } from "react";

type Props = { seconds: number; onDone?: () => void; onTick?: (remaining: number) => void };

export function Countdown({ seconds, onDone, onTick }: Props) {
  const [remaining, setRemaining] = useState(seconds);
  useEffect(() => {
    if (remaining <= 0) { onDone?.(); return; }
    const id = window.setTimeout(() => setRemaining(v => v - 1), 1000);
    onTick?.(remaining);
    return () => window.clearTimeout(id);
  }, [remaining, onDone, onTick]);
  return <span aria-live="polite">{remaining}</span>;
}
