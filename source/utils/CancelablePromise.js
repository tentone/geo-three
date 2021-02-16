
/**
 * Cancelable promises extend base promises and provide a cancel functionality than can be used to cancel the execution or task of the promise.
 * 
 * These type of promises can be used to prevent additional processing when the data is not longer required (e.g. HTTP request for data that is not longer necessary)
 * 
 * @class CancelablePromise
 * @extends {Promise}
 */
class CancelablePromise extends Promise
{
	constructor(resolve, reject, onCancel)
	{
		super(resolve, reject, onCancel);

		/**
		 * Method used to handle a cancel request of a promise.
		 * 
		 * Should return the sucess in cancelling the promise execution.
		 * 
		 * @attribute onCancel
		 * @type {Function}
		 */
		this.onCancel = onCancel;
	}
	
	/**
	 * Try to cancel the promise running, not all promises can be canceled.
	 * 
	 * @return {boolean} True if the promise gets canceled false otherwise.
	 */
	cancel()
	{
		return false;
	}
}
