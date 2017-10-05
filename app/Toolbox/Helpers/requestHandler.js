import {MODE} from '../../../mode';
import axios from 'axios';
import {developmentURL, productionURL} from '../../../config/baseURL';
import backendRoutes from 'backendRoutes';
import querystring from 'querystring';

if (MODE === 'production') {
    axios.defaults.baseURL = productionURL
} else if (MODE === 'development') {
    axios.defaults.baseURL = developmentURL
} else {
    axios.defaults.baseURL = ""
}

axios.defaults.withCredentials=true;

export function postJSON(data,route,params={}) {
    console.log("insdide post json");
    console.log(params);
    const authOptions = {
        method: 'POST',
        url: route,
        data:data,
        params:params,
        headers: {
            'Content-Type': 'application/json'
        }
    };
    return axios(authOptions);
}

export function postForm(data,route,params={}) {
    const authOptions = {
        method: 'POST',
        url: route,
        data: querystring.stringify(data),
        params:params,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }

    };
    return axios(authOptions);
}

export function get(route) {
    const authOptions = {
        method: 'GET',
        url: route,
    };
    return axios(authOptions);
}

export function postJSONWithParams(data,route) {
    const authOptions = {
        method: 'POST',
        url: route,
        params:{
            a:'b'
        },
        data:data,
        headers: {
            'Content-Type': 'application/json'
        }
    };
    return axios(authOptions);
}