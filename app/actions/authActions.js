import {postForm, get} from '../Toolbox/Helpers/requestHandler';
import backendRoutes from 'backendRoutes';
import setAuthToken from '../Toolbox/Auth/SetAuthToken'
import {SET_CURRENT_USER} from "./types";
import {addFlashMessage} from "./flashMessages";

export function setCurrentUser(user) {
    return {
        type: SET_CURRENT_USER,
        user
    };
}

export function logoutRequest() {
    return dispatch => {
        return get(backendRoutes.logout).then(res => {
                localStorage.removeItem('user');
                setAuthToken(false);
                dispatch(addFlashMessage({
                    type: 'success',
                    text: res.data.msg
                }));
                dispatch(setCurrentUser({}));
            }
        );
    }
}

export function loginRequest(data) {
    const dataToBePosted = {
        "identifier": data.identifier,
        "password": data.password,
        "remember": data.remember
    };

    return dispatch => {
        return postForm(dataToBePosted, backendRoutes.login).then(res => {
                const user = res.data.data;

                console.log(res.data.data);
                localStorage.setItem('user', JSON.stringify(user));
                setAuthToken(user.token);
                dispatch(setCurrentUser(user))
            }
        );
    }
}