declare type AnyFunction = (...args: any[]) => any;

declare type Credentials = {
  email: string;
  password: string;
};

declare interface ICacheBase {
  terminal: {
    completionCallback?: AnyFunction | null;
    [key: string]: any;
  };
  requests: {
    [key: string]: unknown;
  };
  [key: string | symbol]: unknown;
}

declare interface IFunctionalCache {
  (...args: any[]): void;
}

declare interface ICache {
  data: ICacheBase;
  get: (key: string) => any;
  set: (key: string, value: any) => void;
  [Symbol.toPrimitive]: IFunctionalCache;
  [key: string | symbol]: any;
}

declare interface CallableCache extends ICache {
  (): void;
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

declare interface ModelAccessor<T> {
  root: ClientInterface;
  uuid: string;
  routePath: string;
  model: ModelInstance<T>;
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
  cache: ICache;
  process: () => this;
  storedPromise: IAccessorPromise<T>;
  from: (...args: any[]) => IAccessorPromise<T>;
  typedList: ModelInstance<T>[];
  // then: (...args: any[]) => Promise<any>;
}

declare interface ClientInterface {
  // [key: string]: ModelAccessor<any>;
  credentials?: Credentials;
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
  cache: ICache;
}

declare interface IAccessorPromise<T> extends Promise<any> {
  lastCaller: Skippable | null;
  accessor?: ModelAccessor<T>;
  sdk?: ClientInterface;
  cache: CallableCache;
  processed: boolean;
  catch: (...args: any[]) => IAccessorPromise<T>;
  finally: (...args: any[]) => IAccessorPromise<T>;
  typedValue: any;
  as: (cacheKey?: string, caller?: string, returnAccessor?: boolean) => this;
  result: ModelAccessor<T> | undefined;
  process: (callback?: AnyFunction) => this;
  response: () => IAccessorPromise<ModelAccessor<T>> | undefined;
  set: (fn?: any) => this | ClientInterface;
  disable: (m: ModelAccessor<T>, f: Skippable, shouldDisable: boolean) => this;
  from: (fn: any, m?: ModelAccessor<T>, i?: ClientInterface) => this;
  once: () => this;
  twice: () => this;
  toString: () => string;
  // cacheTo: as;
  // to = this.set;
  // cacheSafely = this.process;
}

interface IAccessorPromiseConstructor {
  new <T>(
    executor: (
      resolve: (value: T | PromiseLike<T>) => void,
      reject: (reason?: any) => void
    ) => void
  ): IAccessorPromise<T>;
  fromPromise<T>(promise: Promise<T>): IAccessorPromise<T>;
  noOp<T>(): IAccessorPromise<T>;
}

declare interface INoOpPromise extends Promise<any> {
  noOp: () => INoOpPromise;
  to: () => INoOpPromise;
  once: () => INoOpPromise;
  twice: () => INoOpPromise;
}

declare interface Skippable {
  (): IAccessorPromise<any> | INoOpPromise;
  skip?: boolean;
  willSkip?: boolean;
  cache?: unknown;
}
