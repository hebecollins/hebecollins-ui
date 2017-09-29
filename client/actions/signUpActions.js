import axios from 'axios';

export function userSignUpRequest(userData) {
    const authOptions = {
        method: 'POST',
        url: 'http://hebecollinsapi/register-manager',
        data: {
            "nick_name":userData.nick_name,
            "email":userData.email,
            "country_code":userData.country_code,
            "mobile":userData.mobile,
        },
        headers: {
            'Content-Type': 'application/json'
        }
    };
    return dispatch =>{
        return axios(authOptions);
    }
}