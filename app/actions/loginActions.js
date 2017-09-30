import axios from 'axios';
import querystring from 'querystring';
// import config from '../production';
import {sendJSONRequest} from '../Toolbox/Helpers/requestHandler';

export  function loginRequest(data) {

    console.log(sendJSONRequest());
    axios.defaults.baseURL='http://hebecollinsapi';
    const authOptions = {
        method: 'POST',
        url: '/login',
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