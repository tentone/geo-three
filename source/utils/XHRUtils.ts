/**
 * XHR utils contains public static methods to allow easy access to services via XHR.
 */
export class XHRUtils 
{
	/**
	 * Get file data from URL as text, using a XHR call.
	 *
	 * @param url - Target for the request.
	 * @param onLoad - On load callback.
	 * @param onError - On progress callback.
	 */
	public static async get(url: string): Promise<any>
	{
		return new Promise(function(resolve, reject) 
		{
			const xhr = new XMLHttpRequest();
			xhr.overrideMimeType('text/plain');
			xhr.open('GET', url, true);

			xhr.onload = function() 
			{
				resolve(xhr.response);
			};

			xhr.onerror = reject;
			xhr.send(null);
		});
	}

	/**
	 * Get raw file data from URL, using a XHR call.
	 *
	 * @param url - Target for the request.
	 * @param onLoad - On load callback.
	 * @param onError - On progress callback.
	 */
	public static async getRaw(url: string): Promise<ArrayBuffer>
	{
		return new Promise(function(resolve, reject) 
		{
			var xhr = new XMLHttpRequest();
			xhr.responseType = 'arraybuffer';
			xhr.open('GET', url, true);

			xhr.onload = function() 
			{
				resolve(xhr.response);
			};

			xhr.onerror = reject;
			xhr.send(null);
		});
	}

	/**
	 * Perform a request with the specified configuration.
	 *
	 * Syncronous request should be avoided unless they are strictly necessary.
	 *
	 * @param url - Target for the request.
	 * @param type - Resquest type (POST, GET, ...)
	 * @param header - Object with data to be added to the request header.
	 * @param body - Data to be sent in the resquest.
	 * @param onLoad - On load callback, receives data (String or Object) and XHR as arguments.
	 * @param onError - XHR onError callback.
	 */
	public static request(url: string, type: string, header?: any, body?: any, onLoad?: Function, onError?: Function, onProgress?: Function): XMLHttpRequest 
	{
		function parseResponse(response): void 
		{
			try 
			{
				return JSON.parse(response);
			}
			catch (e) 
			{
				return response;
			}
		}

		const xhr = new XMLHttpRequest();
		xhr.overrideMimeType('text/plain');
		xhr.open(type, url, true);

		// Fill header data from Object
		if (header !== null && header !== undefined) 
		{
			for (const i in header) 
			{
				xhr.setRequestHeader(i, header[i]);
			}
		}

		if (onLoad !== undefined) 
		{
			xhr.onload = function(event) 
			{
				onLoad(parseResponse(xhr.response), xhr);
			};
		}

		if (onError !== undefined) 
		{
			// @ts-ignore
			xhr.onerror = onError;
		}

		if (onProgress !== undefined) 
		{
			// @ts-ignore
			xhr.onprogress = onProgress;
		}

		xhr.send(body !== undefined ? body : null);

		return xhr;
	}
}
