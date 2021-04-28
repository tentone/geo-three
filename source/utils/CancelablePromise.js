/**
 * Cancelable promises extend base promises and provide a cancel functionality than can be used to cancel the execution or task of the promise.
 * 
 * These type of promises can be used to prevent additional processing when the data is not longer required (e.g. HTTP request for data that is not longer necessary)
 * 
 * @class CancelablePromise
 */
export class CancelablePromise
{
	constructor(executor) 
	{
		let onResolve;
		let onReject;
		let onCancel;
	
		let fulfilled = false;
		let rejected = false;
		let called = false;
		let value;
	
		function resolve(v) 
		{
			fulfilled = true;
			value = v;
	
			if (typeof onResolve === "function") 
			{
				onResolve(value);
				called = true;
			}
		}
	
		function reject(reason) 
		{
			rejected = true;
			value = reason;
	
			if (typeof onReject === "function") 
			{
				onReject(value);
				called = true;
			}
		}
	
		/**
		 * Request to cancel the promise execution.
		 * 
		 * @returns {boolean} True if the promise is canceled successfully, false otherwise.
		 */
		this.cancel = function()
		{
			// TODO <ADD CODE HERE>
			return false;
		};
	
		/**
		 * Executed after the promise is fulfilled.
		 * 
		 * @param {*} callback 
		 */
		this.then = function(callback) 
		{
			onResolve = callback;
	
			if (fulfilled && !called) 
			{
				called = true;
				onResolve(value);
			}
			return this;
		};
	
		/**
		 * Catch any error that occurs in the promise.
		 * 
		 * @param {*} callback 
		 */
		this.catch = function(callback) 
		{
			onReject = callback;
	
			if (rejected && !called) 
			{
				called = true;
				onReject(value);
			}
			return this;
		};
	
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
	 * Create a resolved promise.
	 * 
	 * @param {*} val Value to pass.
	 * @returns {CancelablePromise} Promise created with resolve value.
	 */
	static resolve(val)
	{
		return new CancelablePromise(function executor(resolve, _reject) 
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
		let fulfilledPromises = [];
		let result = [];

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

