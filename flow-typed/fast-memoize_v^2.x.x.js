declare module "fast-memoize" {
  declare type Cache = {
    has: (key: string) => boolean;
    get: (key: string) => any;
    set: (key: string, value: any) => any;
  }

  declare type Serializer = (...params: any[]) => string;

  declare type Strategy<T> = (fn: T, cache: Cache, serializer: Serializer, ...params: any[]) => any

  declare type MemoizeOptions<T> = {
    cache: Cache,
    serializer: Serializer,
    strategy: Strategy<T>,
  }

  declare export default function memoize<T>(
    fn: T,
    options?: MemoizeOptions<T>
  ): T;
}
