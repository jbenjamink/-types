declare type AnyFunction = (...args: any[]) => any;

declare type Credentials = {
  email: string;
  password: string;
};

declare interface CacheBase {
  terminal: {
    completionCallback?: AnyFunction | null;
    [key: string]: any;
  };
  requests: {
    [key: string]: unknown;
  };
  [key: string | symbol]: unknown;
}

declare interface FunctionalCache {
  (...args: any[]): void;
}

declare interface Cache {
  data: CacheBase;
  get: (key: string) => any;
  set: (key: string, value: any) => void;
  [Symbol.toPrimitive]: FunctionalCache;
  [key: string | symbol]: any;
}

declare interface CallableCache extends Cache {
  (): void;
}

declare interface ModelAccessor<T> {
  root: ClientInterface;
  uuid: string;
  routePath: string;
  model: any;
  parent?: ModelAccessor<any>;
  select(uuid: string): this;
  fetch?: Skippable;
  delete?: () => void;
  getPath: (uuid?: string) => string;
  functionally: (data: any) => () => any;
  thunk: (data?: any) => this;
  noOp: (data?: any) => this;
  once: () => Partial<this>;
  doNextCallOnce: boolean;
  setOnCreate: (setter: () => unknown) => this;
  onCreate: AnyFunction;
  doNextActionOnce: boolean;
  current: any;
  cache: any; //Cache class which uses Cache/CacheBase
  process: () => this;
  storedPromise: AccessorPromise<T>;
  from: (...args: any[]) => AccessorPromise<T>;
  typedList: ModelInstance<T>[];
  // then: (...args: any[]) => Promise<any>;
}

declare interface ModelInstance<T> {
  uuid: string;
  routePath: string;
  accessor?: ModelAccessor<T>;
  select(uuid: string): this;
  refetch?: () => Promise<ModelAccessor<T> | undefined>;
  delete: () => void;
  update: (data: any) => Promise<this>;
  getPath: () => string;
}

declare interface ClientInterface {
  // [key: string]: ModelAccessor<any>;
  credentuals?: Credentials;
  authentication: {
    token: string | null;
    authenticated: boolean;
  };
  auth?: {
    token: string | null;
    authenticated: boolean;
  };
  willStoreNextResult: boolean;
  activeOrganizationUuid?: string;
  isBlocking: boolean;
  await: () => this;
  cache: Cache;
}

declare interface AccessorPromise<T> extends Promise<any> {
  lastCaller: Skippable | null;
  accessor?: ModelAccessor<T>;
  sdk?: ClientInterface;
  cache: CallableCache;
  processed: boolean;
  catch: (...args: any[]) => AccessorPromise<T>;
  finally: (...args: any[]) => AccessorPromise<T>;
  typedValue: any;
  as: (cacheKey?: string, caller?: string, returnAccessor?: boolean) => this;
  result: ModelAccessor<T> | undefined;
  process: (callback?: AnyFunction) => this;
  response: () => ModelAccessor<T> | undefined;
  set: (fn?: any) => this | ClientInterface;
  disable: (m: ModelAccessor<T>, f: Skippable, shouldDisable: boolean) => this;
  from: (fn: any, m?: ModelAccessor<T>, i?: ClientInterface) => this;
  once: () => this;
  twice: () => this;
  fromPromise: (promise: Promise<any>) => AccessorPromise<T>;
  noOp(): NoOpPromise;
  toString: () => string;
  // cacheTo: as;
  // to = this.set;
  // cacheSafely = this.process;
}

declare interface NoOpPromise extends Promise<any> {}

declare interface Skippable {
  (): AccessorPromise<any> | NoOpPromise;
  skip?: boolean;
  willSkip?: boolean;
  cache?: unknown;
}
