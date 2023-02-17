import React, { useContext, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import config from '../config';
import { SettingsContext } from './SettingsContext';
import { getPromise } from '../utils';

// Add a response interceptor
axios.interceptors.response.use(function (response) {
    // Comprueba que el tipo recibido en la respuesta sea el mismo tipo enviado en la petición
    const requestHeaders = response.config.headers;
    const responseHeaders = response.headers;

    if (requestHeaders['Accept'] !== responseHeaders['content-type']) {
        response.status = 406;
        response.text = 'NOK';

        return Promise.reject({
            response: {
                ...response,
                data: { message: 'Ha ocurrido un error en el servidor. Por favor, inténtelo de nuevo más tarde.' },
            }
        });
    }

    return response;
}, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
});

const FetchingContext = React.createContext([{}, () => {}]);

function FetchingProvider({ children }) {
    /** Settings */
    const { setLoading, theme, toastConfig } = useContext(SettingsContext);
    /** Token recibido durante el login para intercambiar con el servidor */
    const [token, setToken] = useState(null);

    /**
     * Helper para obtener la url completa
     */
    const getCompleteUrl = (url, params, method) => {
        const httpMethod = method ? method.toUpperCase() : 'GET';

        switch (httpMethod) {
            case 'POST':
            case 'PUT':
                return `${url}`;
            default:
                const body = params !== undefined && params !== null ? `?${stringifyUrlParams(params)}` : '';
                return `${url}${body}`;
        }
    }

    /**
     * Devuelve el header para las peticiones con autenticación
     */
    const getHttpRequestHeaders = (token = '') => {
        let headers = {
            "Content-Type": "application/json", 
            "Accept": "application/json"
        };

        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        return headers;
    }

    /**
     * Promise to resolve main functionality of a basic CRUD call.
     */
    const request = async (method, url, { body = {}, haveLoading = true, successToast = null, failToast = '' } = {}) => {
        // Promise
        const [prom, resolve, reject] = getPromise();

        if (haveLoading) setLoading(true); 

        let httpCall = get;
        if (method.toUpperCase() === 'POST') {
            httpCall = post;
        } else if (method.toUpperCase() === 'PUT') {
            httpCall = put;
        } else if (method.toUpperCase() === 'DELETE') {
            httpCall = httpDelete;
        }

        await httpCall(url, { body, errorToast: false })
            .then(response => {
                console.dir('');
                console.dir(`${method.toUpperCase()}: ${url}`);
                console.dir(response);
                console.dir('');

                if (successToast) toast.success(successToast, toastConfig());
                resolve(response.data);
            })
            .catch(error => {
                if (failToast !== null) {
                    const message = failToast ? failToast : error.response.data.message;
                    toast.error(message, toastConfig({ autoClose: null }));
                }
                reject(error);
            });

        if (haveLoading) setLoading(false);

        return prom;
    }

    /**
     * Devuelve los parámetros de un objeto de primer nivel dado en formato SOAP: ...?key=value&key=value...
     * 
     * @param data  Objeto con los parámetros. La profundidad del objeto debe ser de 1.
     * @returns     String con la cadena formateada
     */
    const stringifyUrlParams = data => {
        if (typeof data === 'object') {
            const entries = Object.entries(data);
            const params = entries
                .filter(entry => (entry[1] !== '' && entry[1] !== null && entry[1] !== -1))
                .map(entry => {
                    const [key, value] = entry;

                    if (Array.isArray(value)) {
                        return `${key}=${JSON.stringify(value)}`;
                    } else if (typeof value === 'string') {
                        return `${key}=${value.replace(/\s/g, '%20')}`;
                    } else if (typeof value === 'number' || typeof value === 'boolean') {
                        return `${key}=${value}`;
                    }

                    return '';
                })
                .filter(str => str !== '')
                .join('&');

            return params;
        }

        return '';
    }


    /***************************************************************************************************************/


    /**
     * HTTP Request Handler for GET method.
     * 
     * @param   url (string)        Fetch URL
     * @param   config              Request configuration.
     * @param   config.headers      Request headers (Authorization, Accept, etc.).
     * @param   config.body         Request body params.
     * @param   config.timeout      Time to expire the HTTP request.
     * @param   config.errorToast   Show a default error toast if request fail.
     */
    async function get(url, { headers, body = null, timeout = config.timeout, errorToast = true } = {}) {
        // Deestructuring and sanitize
        const _headers = headers || getHttpRequestHeaders(token);

        // Preparamos la URL mediante un método de ayuda
        const completeUrl = getCompleteUrl(url, body);

        // Preparamos la cancelación de llamada por TIMEOUT, según el pasado por configuración
        const source = axios.CancelToken.source();
        let timer = setTimeout(() => {}, 0);

        if (timeout !== null) {
            timer = setTimeout(() => source.cancel(`HTTP_REQUEST_TIMEOUT: ${timeout}ms`), timeout);
        }

        // Preparamos la configuración como objeto tipo AxiosRequestConfig
        const config = { headers: _headers, cancelToken: source.token };

        // Devolvemos la llamada
        return axios.get(completeUrl, config)
            .then(res => {
                if (timeout !== null) clearTimeout(timer);
                return res;
            })
            .catch(error => {
                console.error(error);
                if (errorToast) toast.error(error.response.data.message, toastConfig({ autoClose: null }));
                return Promise.reject(error);
            });
    }

    /**
     * HTTP Request Handler for POST method.
     * 
     * @param   url (string)        Fetch URL
     * @param   config              Request configuration.
     * @param   config.headers      Request headers (Authorization, Accept, etc.).
     * @param   config.body         Request body params.
     * @param   config.timeout      Time to expire the HTTP request.
     * @param   config.errorToast   Show a default error toast if request fail.
     */
    async function post(url, { headers, body = null, timeout = config.timeout, errorToast = true } = {}) {
        // Deestructuring and sanitize
        const _headers = headers || getHttpRequestHeaders(token);

        // Preparamos la URL mediante un método de ayuda
        const completeUrl = getCompleteUrl(url, null, 'POST');

        // Preparamos la cancelación de llamada por TIMEOUT, según el pasado por configuración
        const source = axios.CancelToken.source();
        let timer = setTimeout(() => {}, 0);

        if (timeout !== null) {
            timer = setTimeout(() => source.cancel(`HTTP_REQUEST_TIMEOUT: ${timeout}ms`), timeout);
        }

        // Preparamos la configuración como objeto tipo AxiosRequestConfig
        const config = { headers: _headers, cancelToken: source.token };

        // Devolvemos la llamada
        return axios.post(completeUrl, body, config)
            .then(res => {
                if (timeout !== null) clearTimeout(timer);
                return res;
            })
            .catch(error => {
                console.error(error);
                if (errorToast) toast.error(error.response.data.message, toastConfig({ autoClose: null }));
                return Promise.reject(error);
            });
    }

    /**
     * HTTP Request Handler for PUT method.
     * 
     * @param   url (string)        Fetch URL
     * @param   config              Request configuration.
     * @param   config.headers      Request headers (Authorization, Accept, etc.).
     * @param   config.body         Request body params.
     * @param   config.timeout      Time to expire the HTTP request.
     * @param   config.errorToast   Show a default error toast if request fail.
     */
    async function put(url, { headers, body = null, timeout = config.timeout, errorToast = true } = {}) {
        // Deestructuring and sanitize
        const _headers = headers || getHttpRequestHeaders(token);

        // Preparamos la URL mediante un método de ayuda
        const completeUrl = getCompleteUrl(url, null, 'PUT');

        // Preparamos la cancelación de llamada por TIMEOUT, según el pasado por configuración
        const source = axios.CancelToken.source();
        let timer = setTimeout(() => {}, 0);

        if (timeout !== null) {
            timer = setTimeout(() => source.cancel(`HTTP_REQUEST_TIMEOUT: ${timeout}ms`), timeout);
        }

        // Preparamos la configuración como objeto tipo AxiosRequestConfig
        const config = { headers: _headers, cancelToken: source.token };

        // Devolvemos la llamada
        return axios.put(completeUrl, body, config)
            .then(res => {
                if (timeout !== null) clearTimeout(timer);
                return res;
            })
            .catch(error => {
                console.error(error);
                if (errorToast) toast.error(error.response.data.message, toastConfig({ autoClose: null }));
                return Promise.reject(error);
            });
    }

    /**
     * HTTP Request Handler for DELETE method.
     * 
     * @param   url (string)        Fetch URL
     * @param   config              Request configuration.
     * @param   config.headers      Request headers (Authorization, Accept, etc.).
     * @param   config.body         Request body params.
     * @param   config.timeout      Time to expire the HTTP request.
     * @param   config.errorToast   Show a default error toast if request fail.
     */
    async function httpDelete(url, { headers, body = null, timeout = config.timeout, errorToast = true } = {}) {
        // Deestructuring and sanitize
        const _headers = headers || getHttpRequestHeaders(token);

        // Preparamos la URL mediante un método de ayuda
        const completeUrl = getCompleteUrl(url, body, 'DELETE');

        // Preparamos la cancelación de llamada por TIMEOUT, según el pasado por configuración
        const source = axios.CancelToken.source();
        let timer = setTimeout(() => {}, 0);

        if (timeout !== null) {
            timer = setTimeout(() => source.cancel(`HTTP_REQUEST_TIMEOUT: ${timeout}ms`), timeout);
        }

        // Preparamos la configuración como objeto tipo AxiosRequestConfig
        const config = { headers: _headers, cancelToken: source.token };

        // Devolvemos la llamada
        return axios.delete(completeUrl, config)
            .then(res => {
                if (timeout !== null) clearTimeout(timer);
                return res;
            })
            .catch(error => {
                console.error(error);
                if (errorToast) toast.error(error.response.data.message, toastConfig({ autoClose: null }));
                return Promise.reject(error);
            });
    }

    /**
     * Variables, estados y funciones a exportar en el contexto
     */
    const value = { 
        token, setToken, 
        get, post, put, httpDelete, request,
        getHttpRequestHeaders, stringifyUrlParams
    };

    return <FetchingContext.Provider value={value}>{children}</FetchingContext.Provider>;
}

export { FetchingContext, FetchingProvider };
