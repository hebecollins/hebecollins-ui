import {postJSON} from '../Toolbox/Helpers/requestHandler';
import backendRoutes from 'backendRoutes';

export function userSignUpRequest(userData) {
    delete userData.errors;
    delete userData.isLoading;

    return dispatch => {
        return postJSON(userData,backendRoutes.signup);
    }
}