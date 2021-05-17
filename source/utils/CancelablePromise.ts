/**
 * Cancelable promises extend base promises and provide a cancel functionality than can be used to cancel the execution or task of the promise.
 *
 * These type of promises can be used to prevent additional processing when the data is not longer required (e.g. HTTP request for data that is not longer necessary)
 */
export class CancelablePromise<T> // extends Promise<T>
{
	public onResolve: (value: any)=> void;

	public onReject: (error: any)=> void;

	public onCancel: ()=> void;

	public fulfilled: boolean = false;

	public rejected: boolean = false;

	public called: boolean = false;

	public value: T;

	public constructor(executor: (resolve: (value: T | PromiseLike<T>)=> void, reject: (reason?: any)=> void)=> void) 
	{
		// super(executor);

		function resolve(v): void
		{
			this.fulfilled = true;
			this.value = v;

			if (typeof this.onResolve === 'function') 
			{
				this.onResolve(this.value);
				this.called = true;
			}
		}

		function reject(reason): void
		{
			this.rejected = true;
			this.value = reason;

			if (typeof this.onReject === 'function') 
			{
				this.onReject(this.value);
				this.called = true;
			}
		}

		try 
		{
			executor(resolve, reject);
		}
		catch (error) 
		{
			reject(error);
		}
	}

	/**
	 * Request to cancel the promise execution.
	 *
	 * @returns True if the promise is canceled successfully, false otherwise.
	 */
	public cancel(): boolean
	{
		// TODO <ADD CODE HERE>
		return false;
	}

	/**
	 * Executed after the promise is fulfilled.
	 *
	 * @param callback - Callback to receive the value.
	 * @returns Promise for chainning.
	 */
	public then(callback: (value: any)=> void): CancelablePromise<T>
	{
		this.onResolve = callback;

		if (this.fulfilled && !this.called) 
		{
			this.called = true;
			this.onResolve(this.value);
		}

		return this;
	}

	/**
	 * Catch any error that occurs in the promise.
	 *
	 * @param callback - Method to catch errors.
	 * @returns Promise for chainning.
	 */
	public catch(callback: (error: any)=> void): CancelablePromise<T>
	{
		this.onReject = callback;

		if (this.rejected && !this.called) 
		{
			this.called = true;
			this.onReject(this.value);
		}
		return this;
	}

	/**
	 * Finally callback
	 *
	 * @param callback - Method to be called.
	 * @returns Promise for chainning.
	 */
	public finally(callback: Function): CancelablePromise<T>
	{
		// TODO: not implemented
		return this;
	}

	/**
	 * Create a resolved promise.
	 *
	 * @param val - Value to pass.
	 * @returns Promise created with resolve value.
	 */
	public static resolve<T>(val: T): CancelablePromise<T>
	{
		return new CancelablePromise<T>(function executor(resolve, _reject) 
		{
			resolve(val);
		});
	}

	/**
	 * Create a rejected promise.
	 *
	 * @param reason - Reason to reject the promise.
	 * @returns Promise created with rejection reason.
	 */
	public static reject(reason: any): CancelablePromise<any>
	{
		return new CancelablePromise(function executor(resolve, reject) 
		{
			reject(reason);
		});
	}

	/**
	 * Wait for a set of promises to finish, creates a promise that waits for all running promises.
	 *
	 * If any of the promises fail it will reject altough some of them may have been completed with success.
	 *
	 * @param promises - List of promisses to syncronize.
	 * @returns Promise that will resolve when all of the running promises are fullfilled.
	 */
	public static all(promises: CancelablePromise<any>[]): CancelablePromise<any>
	{
		const fulfilledPromises = [];
		const result = [];

		function executor(resolve, reject): void 
		{
			promises.forEach((promise, index) =>
			{
				return promise
					.then((val) => 
					{
						fulfilledPromises.push(true);
						result[index] = val;

						if (fulfilledPromises.length === promises.length) 
						{
							return resolve(result);
						}
					})
					.catch((error) => {return reject(error);});
			}
			);
		}

		return new CancelablePromise(executor);
	}
}
