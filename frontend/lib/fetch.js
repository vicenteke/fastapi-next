import { getToken } from './token.js';
import { openModal, setModalTitle, setModalContent } from './bulma.js';

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
        useErrorModal=true,
    }
) {
    const errorModalName = 'fetch-server-error-modal';
    const route = `/api${url}`;
    const onFetchError = (error) => {
        if (onError)
            onError(error);
        if (useErrorModal) {
            setModalContent(errorModalName, error);
            openModal(errorModalName);
        }
    }

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
        return await fetch(route, requestInit)
            .then((response) => {
                if (!response.ok)
                    onFetchError(response);
                else
                    return response.json().then((response) => {
                        if (onSuccess) {
                            onSuccess(response);
                        }
                    });
            })
            .catch(
                (error) => {
                    onFetchError(error);
                }
            )
    } catch (exception) {
        if (onFetchError)
            onFetchError(exception);
    }
}
