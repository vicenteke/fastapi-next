
import { getToken } from './token.js';

/* Description: method used to fetch the server
 * Parameters:
 * - url: string containing the roue (without domain)
 * - payload: data sent to the route
 */
export default async function fetchServer(
    url,
    {
        payload={},
        method="GET",
        token=true,
        headers={},
        contentType="application/json",
        onLoading=function(...params) {},
        onSuccess=function(...params) {},
        onError=function(...params) {},
    }
) {
    const route = url;
    // const route = `${process.env.NEXT_PUBLIC_SERVER_URL}${url}`;
    const getAuthHeader = () => {
        token = getToken();
        if (token)
            return { Authorization: `Bearer ${token.access_token}`}
        return {}
    }

    headers = {
        "Accept": "application/json",
        "Content-Type": contentType,
        ...headers,
        ...getAuthHeader(),
    };

    let requestInit = {
        "method": method,
        "headers": headers,
    };

    if (payload) {
        if (typeof payload !== 'string')
            payload = JSON.stringify(payload);
        requestInit.body = payload;
    }

    try {
        if (onLoading)
            onLoading();
        console.log('>>>>>>>>>>>>>>>>', requestInit);
        return await fetch(route, requestInit)
            .then((response) => response.json())
            .then((response) => {
                if (response.ok) {
                    if (onSuccess)
                        onSuccess(response);
                } else {
                    if (onError)
                        onError(response);
                }
            })
            .catch(
                (error) => {
                    if (onError)
                        onError(error);
                }
            )
    } catch (exception) {
        if (onError)
            onError(exception);
    }
}
