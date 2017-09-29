import axios from 'axios';
import querystring from 'querystring';

export  function loginRequest(data) {
    const authOptions = {
        method: 'POST',
        url: 'http://hebecollinsapi/login',
        data: querystring.stringify(
            {
            identifier: data.identifier,
            password: data.password
        }),
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    };
    return dispatch => {
        const a=axios(authOptions);
        return a;
    }
}