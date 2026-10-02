type Props = { message: string; kind?: "info" | "success" | "error"; onClose?: () => void };

export function Toast({ message, kind = "info", onClose }: Props) {
  return <div role={kind === "error" ? "alert" : "status"} data-kind={kind}>{message}{onClose && <button type="button" onClick={onClose}>×</button>}</div>;
}
