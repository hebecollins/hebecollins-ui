import {postForm, get} from '../Toolbox/Helpers/requestHandler';
import backendRoutes from 'backendRoutes';
import setAuthToken from '../Toolbox/Auth/SetAuthToken'
import {SET_CURRENT_USER} from "./types";
import {addFlashMessage} from "./flashMessages";
import {browserHistory} from 'react-router';

export function setCurrentUser(user) {
    return {
        type: SET_CURRENT_USER,
        user
    };
}

export function logoutRequest() {
    return dispatch => {
        return get(backendRoutes.logout).then(res => {
            console.log(res.data);
            localStorage.removeItem('user');
                setAuthToken(false);
                dispatch(addFlashMessage({
                    type: 'success',
                    text: res.data.msg
                }));
                dispatch(setCurrentUser({}));
            }
        )
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
                localStorage.setItem('user', JSON.stringify(user));
                setAuthToken(user.token);
                dispatch(setCurrentUser(user))
            }
        );
    }
}

export function passwordRecoverRequest(data) {
    const dataToBePosted = {
        "email": data.email,
    };

    return dispatch => {
        return postForm(dataToBePosted, backendRoutes.password_recover).then(res => {
                browserHistory.push('/');
                dispatch(addFlashMessage({
                    type: 'success',
                    text: res.data.msg
                }))
            }
        );
    }
}


export function passwordResetRequest(data,params) {
    const dataToBePosted = {
        "password": data.password,
        "password_confirm":data.password_confirm
    };
    return dispatch => {
        return postForm(dataToBePosted, backendRoutes.password_reset, params).then(res => {
                browserHistory.push('/');
                dispatch(addFlashMessage({
                    type: 'success',
                    text: res.data.msg
                }))
            }
        );
    }
}