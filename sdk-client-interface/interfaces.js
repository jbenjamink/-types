module.exports = {
  "ICacheBase": {
    "terminal": "{ [key: string]: any; completionCallback?: AnyFunction; }",
    "requests": "{ [key: string]: unknown; }"
  },
  "IFunctionalCache": {},
  "ICache": {
    "data": "ICacheBase",
    "get": "(key: string) => any",
    "set": "(key: string, value: any) => void",
    "[Symbol.toPrimitive]": "IFunctionalCache"
  },
  "CallableCache": {},
  "ModelAccessor": {
    "root": "ClientInterface",
    "uuid": "string",
    "routePath": "string",
    "model": "any",
    "parent": "ModelAccessor<any>",
    "fetch": "Skippable",
    "delete": "() => void",
    "getPath": "(uuid?: string) => string",
    "functionally": "(data: any) => () => any",
    "thunk": "(data?: any) => this",
    "noOp": "(data?: any) => this",
    "once": "() => Partial<this>",
    "doNextCallOnce": "boolean",
    "setOnCreate": "(setter: () => unknown) => this",
    "onCreate": "AnyFunction",
    "doNextActionOnce": "boolean",
    "current": "any",
    "cache": "any",
    "process": "() => this",
    "storedPromise": "IAccessorPromise<T>",
    "from": "(...args: any[]) => IAccessorPromise<T>",
    "typedList": "ModelInstance<T>[]"
  },
  "ModelInstance": {
    "uuid": "string",
    "routePath": "string",
    "accessor": "ModelAccessor<T>",
    "refetch": "() => Promise<ModelAccessor<T>>",
    "delete": "() => void",
    "update": "(data: any) => Promise<this>",
    "getPath": "() => string"
  },
  "ClientInterface": {
    "credentials": "Credentials",
    "authentication": "{ token: string; authenticated: boolean; }",
    "auth": "{ token: string; authenticated: boolean; }",
    "willStoreNextResult": "boolean",
    "activeOrganizationUuid": "string",
    "isBlocking": "boolean",
    "await": "() => this",
    "cache": "Cache"
  },
  "IAccessorPromise": {
    "lastCaller": "Skippable",
    "accessor": "ModelAccessor<T>",
    "sdk": "ClientInterface",
    "cache": "CallableCache",
    "processed": "boolean",
    "catch": "(...args: any[]) => IAccessorPromise<T>",
    "finally": "(...args: any[]) => IAccessorPromise<T>",
    "typedValue": "any",
    "as": "(cacheKey?: string, caller?: string, returnAccessor?: boolean) => this",
    "result": "ModelAccessor<T>",
    "process": "(callback?: AnyFunction) => this",
    "response": "() => ModelAccessor<T>",
    "set": "(fn?: any) => ClientInterface | this",
    "disable": "(m: ModelAccessor<T>, f: Skippable, shouldDisable: boolean) => this",
    "from": "(fn: any, m?: ModelAccessor<T>, i?: ClientInterface) => this",
    "once": "() => this",
    "twice": "() => this",
    "fromPromise": "(promise: Promise<any>) => IAccessorPromise<T>",
    "toString": "() => string"
  },
  "INoOpPromise": {
    "noOp": "() => INoOpPromise",
    "to": "INoOpPromise",
    "once": "INoOpPromise",
    "twice": "INoOpPromise"
  },
  "Skippable": {
    "skip": "boolean",
    "willSkip": "boolean",
    "cache": "unknown"
  }
}