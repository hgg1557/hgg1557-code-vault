export function getDeviceInfo() {
  if (typeof navigator === "undefined") return { userAgent: "", mobile: false, platform: "" };
  return {
    userAgent: navigator.userAgent,
    mobile: /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent),
    platform: navigator.platform
  };
}
