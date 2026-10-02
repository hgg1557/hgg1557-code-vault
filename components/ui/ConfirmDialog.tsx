import { Modal } from "./Modal";

type Props = { open: boolean; title?: string; message: string; confirmText?: string; cancelText?: string; onConfirm: () => void; onCancel: () => void };

export function ConfirmDialog({ open, title = "Confirm", message, confirmText = "Confirm", cancelText = "Cancel", onConfirm, onCancel }: Props) {
  return (
    <Modal open={open} title={title} onClose={onCancel}>
      <p>{message}</p>
      <button type="button" onClick={onCancel}>{cancelText}</button>
      <button type="button" onClick={onConfirm}>{confirmText}</button>
    </Modal>
  );
}
