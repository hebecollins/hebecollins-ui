import {postForm} from '../Toolbox/Helpers/requestHandler';
import backendRoutes from 'backendRoutes';

export function loginRequest(data) {

    const dataToBePosted = {
        "identifier": data.identifier,
        "password": data.password,
        "remember": data.remember
    };

    return dispatch => {
        return postForm(dataToBePosted, backendRoutes.login);
    }
}