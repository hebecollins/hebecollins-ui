import {postJSON} from '../Toolbox/Helpers/requestHandler';
import backendRoutes from 'backendRoutes';

export function userSignUpRequest(userData) {
    const dataToBePosted={
        "nick_name": userData.nick_name,
        "email": userData.email,
        "country_code": userData.country_code,
        "mobile": userData.mobile,
    };

    return dispatch => {
        return postJSON(dataToBePosted,backendRoutes.signup);
    }
}