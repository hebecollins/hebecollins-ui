import {MODE} from '../../../mode';
import axios from 'axios';
import {developmentURL, productionURL, localURL, localQburstURL} from '../../../config/baseURL';
import querystring from 'querystring';

axios.defaults.baseURL =
    (MODE === 'production') ? productionURL :
        (MODE === 'development') ? developmentURL :
            (MODE === 'local_qburst') ? localQburstURL : localURL;

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
 * */
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

export function getMedia(route) {
    const authOptions = {
        method: 'GET',
        url: route,
        responseType: 'stream',
        headers: {
            'Accept': 'image/webp,image/apng,image/*,*/*;q=0.8',
        },

    };
    return axios.get(route, {
        responseType: 'blob'
    });
}