export function throttle<T extends (...args: any[]) => void>(fn: T, wait: number): T {
  let last = 0;
  let timer: ReturnType<typeof setTimeout> | undefined;
  let pending: Parameters<T> | undefined;
  return function(this: unknown, ...args: Parameters<T>) {
    const now = Date.now();
    const remaining = wait - (now - last);
    pending = args;
    if (remaining <= 0) {
      last = now;
      fn.apply(this, args);
      pending = undefined;
    } else if (!timer) {
      timer = setTimeout(() => {
        timer = undefined;
        last = Date.now();
        if (pending) fn.apply(this, pending);
        pending = undefined;
      }, remaining);
    }
  } as T;
}
