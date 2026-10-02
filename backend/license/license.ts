export type LicenseRecord = { key: string; active: boolean; deviceId?: string | null; expiresAt?: string | null };

export function verifyLicense(record: LicenseRecord | null, deviceId: string, now = new Date()): { ok: boolean; reason?: string } {
  if (!record) return { ok: false, reason: "NOT_FOUND" };
  if (!record.active) return { ok: false, reason: "DISABLED" };
  if (record.expiresAt && new Date(record.expiresAt).getTime() < now.getTime()) return { ok: false, reason: "EXPIRED" };
  if (record.deviceId && record.deviceId !== deviceId) return { ok: false, reason: "DEVICE_MISMATCH" };
  return { ok: true };
}

export function bindDevice(record: LicenseRecord, deviceId: string): LicenseRecord {
  return record.deviceId ? record : { ...record, deviceId };
}
