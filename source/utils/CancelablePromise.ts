/**
 * Cancelable promises extend base promises and provide a cancel functionality than can be used to cancel the execution or task of the promise.
 *
 * These type of promises can be used to prevent additional processing when the data is not longer required (e.g. HTTP request for data that is not longer necessary)
 *
 * @class CancelablePromise
 */
export class CancelablePromise<T> 
{
	onResolve;

	onReject;

	onCancel;

	fulfilled = false;

	rejected = false;

	called = false;

	value: T;

	constructor(executor) 
	{
		function resolve(v) 
		{
			this.fulfilled = true;
			this.value = v;

			if (typeof this.onResolve === 'function') 
			{
				this.onResolve(this.value);
				this.called = true;
			}
		}

		function reject(reason) 
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
	 * @returns {boolean} True if the promise is canceled successfully, false otherwise.
	 */
	cancel() 
	{
		// TODO <ADD CODE HERE>
		return false;
	}

	/**
	 * Executed after the promise is fulfilled.
	 *
	 * @param {*} callback
	 */
	then(callback) 
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
	 * @param {*} callback
	 */
	catch(callback) 
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
	 * finally.
	 *
	 * @param {*} callback
	 */
	finally(callback) 
	{
		// TODO: not implemented
		return this;
	}

	[Symbol.toStringTag] = 'CancelablePromise';

	/**
	 * Create a resolved promise.
	 *
	 * @param {*} val Value to pass.
	 * @returns {CancelablePromise} Promise created with resolve value.
	 */
	static resolve<T>(val) 
	{
		return new CancelablePromise<T>(function executor(resolve, _reject) 
		{
			resolve(val);
		});
	}

	/**
	 * Create a rejected promise.
	 *
	 * @param {*} reason
	 * @returns {CancelablePromise} Promise created with rejection reason.
	 */
	static reject(reason) 
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
	 * @param {*} promises
	 * @returns {CancelablePromise} Promise that will resolve when all of the running promises are fullfilled.
	 */
	static all(promises) 
	{
		const fulfilledPromises = [];
		const result = [];

		function executor(resolve, reject) 
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
