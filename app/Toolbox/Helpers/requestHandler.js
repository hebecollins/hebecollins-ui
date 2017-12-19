import axios from 'axios';
import {BASE_URL} from '../../../config/baseURL';
import querystring from 'querystring';

axios.defaults.baseURL = BASE_URL;

axios.defaults.withCredentials = true;

export function postJSON(data, route, params = {}) {
    const authOptions = {
        method: 'POST',
        url: route,
        data: data,
        params: params,
        headers: {
            'Content-Type': 'application/json'
        }
    };
    return axios(authOptions);
}

export function postForm(data, route, params = {}) {
    const authOptions = {
        method: 'POST',
        url: route,
        data: querystring.stringify(data),
        params: (params),
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    };

    return axios(authOptions);
}


/**Sends media content.
 **/
export function postMedia(data, route, params = {}) {
    let formData = new FormData();
    Object.keys(data).map((key) => {
        formData.append(key, data[key]);
    });

    const authOptions = {
        method: 'POST',
        url: route,
        data: formData,
        params: (params)
    };
    return axios(authOptions);
}


export function get (route) {
    const authOptions = {
        method: 'GET',
        url: route,
    };
    return axios(authOptions);
}