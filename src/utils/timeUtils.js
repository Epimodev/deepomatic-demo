// @flow

export function wait<T>(duration: number): (T) => Promise<T> {
  return (data: T) => (
    new Promise((resolve) => {
      setTimeout(() => {
        resolve(data);
      }, duration);
    })
  );
}

export function waitAtLeast<T>(duration: number): (T) => Promise<T> {
  const startTime = Date.now();
  return (data: T) => (
    new Promise((resolve) => {
      const endTime = Date.now();
      const timeoutRemaining = duration - (endTime - startTime);
      const timeout = timeoutRemaining > 0 ? timeoutRemaining : 0;
      setTimeout(() => {
        resolve(data);
      }, timeout);
    })
  );
}
