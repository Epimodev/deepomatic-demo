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
