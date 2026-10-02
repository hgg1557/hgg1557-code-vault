import type { ReactNode } from "react";

type Props = { open: boolean; title?: string; children: ReactNode; onClose: () => void };

export function Modal({ open, title, children, onClose }: Props) {
  if (!open) return null;
  return (
    <div role="dialog" aria-modal="true" aria-label={title}>
      <div>
        {title && <h2>{title}</h2>}
        <button type="button" onClick={onClose} aria-label="Close">×</button>
        <div>{children}</div>
      </div>
    </div>
  );
}
