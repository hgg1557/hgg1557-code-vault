export type UploadRule = { extensions: readonly string[]; mimeTypes: readonly string[]; maxBytes: number };

export function validateUpload(file: { name: string; type: string; size: number }, rule: UploadRule): string[] {
  const errors: string[] = [];
  const ext = file.name.toLowerCase().match(/\.([a-z0-9]+)$/)?.[1] ?? "";
  if (!rule.extensions.includes(ext)) errors.push("Unsupported file extension");
  if (!rule.mimeTypes.includes(file.type)) errors.push("Unsupported MIME type");
  if (file.size > rule.maxBytes) errors.push("File exceeds maximum size");
  return errors;
}
