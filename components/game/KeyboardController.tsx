import { useEffect } from "react";

type Props = { keys: Record<string, () => void>; enabled?: boolean };

export function KeyboardController({ keys, enabled = true }: Props) {
  useEffect(() => {
    if (!enabled) return;
    const handler = (event: KeyboardEvent) => {
      const action = keys[event.key] ?? keys[event.code];
      if (!action) return;
      event.preventDefault();
      action();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [keys, enabled]);
  return null;
}
