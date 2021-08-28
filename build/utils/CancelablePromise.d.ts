export declare class CancelablePromise<T> {
    onResolve: (value: any) => void;
    onReject: (error: any) => void;
    onCancel: () => void;
    fulfilled: boolean;
    rejected: boolean;
    called: boolean;
    value: T;
    constructor(executor: (resolve: (value: T | PromiseLike<T>) => void, reject: (reason?: any) => void) => void);
    cancel(): boolean;
    then(callback: (value: any) => void): CancelablePromise<T>;
    catch(callback: (error: any) => void): CancelablePromise<T>;
    finally(callback: Function): CancelablePromise<T>;
    static resolve<T>(val: T): CancelablePromise<T>;
    static reject(reason: any): CancelablePromise<any>;
    static all(promises: CancelablePromise<any>[]): CancelablePromise<any>;
}
