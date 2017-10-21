import {postForm, get} from '../../Toolbox/Helpers/requestHandler';
import setAuthToken from '../../Toolbox/Auth/SetAuthToken'
import {SET_CURRENT_USER} from "../types";
import {addFlashMessage} from "./flashMessages";
import {redirectTo, redirectToHome} from '../../Toolbox/Helpers/redirect'
import {BACKEND_ROUTES} from "../../../config/backendRoutes";

export function setCurrentUser(user) {
    return {
        type: SET_CURRENT_USER,
        user
    };
}

export function logoutRequest() {
    return dispatch => {
        return get(BACKEND_ROUTES.LOGOUT).then(res => {
                localStorage.removeItem('user');
                setAuthToken(false);
                dispatch(addFlashMessage({
                    type: 'success',
                    text: res.data.msg
                }));
                dispatch(setCurrentUser({}));
            }
        ).catch( err=>{
            dispatch(setCurrentUser({}));
            redirectToHome();
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
        return postForm(dataToBePosted, BACKEND_ROUTES.LOGIN).then(res => {
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
            "target":data.target,
            "email": data.email,
            "mobile":data.mobile,
            "country_code":data.country_code
        };

    return dispatch => {
        return postForm(dataToBePosted, BACKEND_ROUTES.PASSWORD.RECOVER).then(res => {
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
        return postForm(dataToBePosted, BACKEND_ROUTES.PASSWORD.RESET, params).then(res => {
                redirectToHome();
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
        return postForm(dataToBePosted, BACKEND_ROUTES.PASSWORD.CHANGE).then(res => {
                redirectTo('/');
                dispatch(addFlashMessage({
                    type: 'success',
                    text: res.data.msg
                }))
            }
        );
    }
}