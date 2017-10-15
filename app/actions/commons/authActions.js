import {postForm, get} from '../../Toolbox/Helpers/requestHandler';
import backendRoutes from 'backendRoutes';
import setAuthToken from '../../Toolbox/Auth/SetAuthToken'
import {SET_CURRENT_USER} from "../types";
import {addFlashMessage} from "./flashMessages";
import {redirectTo} from '../../Toolbox/Helpers/redirect'

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
        ).catch(err=>{
            dispatch(setCurrentUser({}));
            redirectTo('/')
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
                dispatch(setCurrentUser(user));
                redirectTo('/' + user.user_type);
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
                redirectTo('/');
                dispatch(addFlashMessage({
                    type: 'success',
                    text: res.data.msg
                }))
            }
        );
    }
}


export function passwordResetRequest(data, params) {
    const dataToBePosted = {
        "password": data.password,
        "password_confirm": data.password_confirm
    };
    return dispatch => {
        return postForm(dataToBePosted, backendRoutes.password_reset, params).then(res => {
                redirectTo('/');
                dispatch(addFlashMessage({
                    type: 'success',
                    text: res.data.msg
                }))
            }
        );
    }
}


export function passwordChangeRequest(data) {
    const dataToBePosted = {
        "old_password": data.old_password,
        "new_password": data.new_password,
        "confirm_new_password": data.confirm_new_password
    };
    return dispatch => {
        return postForm(dataToBePosted, backendRoutes.password_change).then(res => {
                redirectTo('/');
                dispatch(addFlashMessage({
                    type: 'success',
                    text: res.data.msg
                }))
            }
        );
    }
}