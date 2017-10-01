import {postJSON} from '../Toolbox/Helpers/requestHandler';
import backendRoutes from 'backendRoutes';

export function userSignUpRequest(userData) {
    // const authOptions = {
    //     method: 'POST',
    //     url: 'http://api.hebecollins.com/register-manager',
    console.log("here");
    const dataToBePosted={
            "nick_name": userData.nick_name,
            "email": userData.email,
            "country_code": userData.country_code,
            "mobile": userData.mobile,
        };
    console.log("agin");

    //     ,
    //     headers: {
    //         'Content-Type': 'application/json'
    //
    // };
    return dispatch => {
        return postJSON(dataToBePosted,backendRoutes.signup);
    }
}