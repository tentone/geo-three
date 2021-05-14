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
	public static get(url: string, onLoad?: Function, onError?: Function) 
	{
		const xhr = new XMLHttpRequest();
		xhr.overrideMimeType('text/plain');
		xhr.open('GET', url, true);

		if (onLoad !== undefined) 
		{
			xhr.onload = function() 
			{
				onLoad(xhr.response);
			};
		}

		if (onError !== undefined) 
		{
			xhr.onerror = onError;
		}

		xhr.send(null);

		return xhr;
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
	public static request(url: string, type: string, header?: any, body?: any, onLoad?: Function, onError?: Function, onProgress?: Function) 
	{
		function parseResponse(response) 
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
			xhr.onerror = onError;
		}

		if (onProgress !== undefined) 
		{
			xhr.onprogress = onProgress;
		}

		if (body !== undefined) 
		{
			xhr.send(body);
		}
		else 
		{
			xhr.send(null);
		}

		return xhr;
	}
}
