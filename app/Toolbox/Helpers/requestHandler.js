import {MODE} from '../../../mode';
import axios from 'axios';
import {developmentURL, productionURL} from '../../../config/baseURL';

if (MODE === 'production') {
    axios.defaults.baseURL = productionURL
} else if (MODE === 'development') {
    axios.defaults.baseURL = developmentURL
} else {
    axios.defaults.baseURL = ""
}

export function postJSON() {
    return "hello";
}

export function postForm() {
    return "helllllllo";
}

export function get() {
    return "helllllllo";
}
