import axios from 'axios';
import querystring from 'querystring';
import {sendJSONRequest} from '../Toolbox/Helpers/requestHandler';

export  function loginRequest(data) {
    // console.log(sendJSONRequest(data,route));

    axios.defaults.baseURL='http://hebecollinsapi';
    const authOptions = {
        method: 'POST',
        url: '/login',
        data: querystring.stringify(
            {
                "identifier": data.identifier,
                "password": data.password,
                "remember": data.remember
            }
            ),
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    };
    return dispatch => {
        const a = axios(authOptions);
        return a;
    }
}