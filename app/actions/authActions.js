import {postForm, get} from '../Toolbox/Helpers/requestHandler';
import setAuthToken from '../Toolbox/Auth/SetAuthToken'
import {addFlashMessage, logout, saveSelectedGym, setCurrentUser} from "./actionStore";
import {redirectTo, redirectToHome} from '../Toolbox/Helpers/redirect'
import {BACKEND_ROUTES} from "../../config/backendRoutes";
import isEmpty from 'lodash/isEmpty'

/** sends login details to the server. If response comes as success, it stores current user's
 * details in redux store and in local storage. Also if response contains a field 'gym_list',
 * it takes the first element of that array and store that as default selectedGym in both redux
 * store as well as local storage. After all this, it redirects to user's home page
 *
 * @param data => object{identifier, password, remember}
 *                  identifier is email/mobile
 *                  remember is boolean, true if 'remember me' box is checked else false
 */
export function loginRequest(data) {
    const dataToBePosted = {
        "identifier": data.identifier,
        "password": data.password,
        "remember": data.remember
    };

    return dispatch => {
        return postForm(dataToBePosted, BACKEND_ROUTES.AUTHENTICATION.LOGIN).then(res => {
                const user = res.data.data;

                //storing current user's info for sending subsequent requests
                localStorage.setItem('user', JSON.stringify(user));
                setAuthToken(user.token);
                dispatch(setCurrentUser(user));

                //selecting a default gym for a non-admin account
                //TODO: make selection of default gym customisable
                if (!isEmpty(user.gym_list)) {
                    dispatch(setDefaultGym(user.gym_list[0]));
                }
                redirectTo('/' + user.user_type);
            }
        );
    }
}

/** sends a logout request to the server. If a success response comes, it deletes all the data
 * stored in localStorage and redux
 */
export function logoutRequest() {
    return dispatch => {
        return get(BACKEND_ROUTES.AUTHENTICATION.LOGOUT).then(res => {
                localStorage.clear();
                setAuthToken(false);
                dispatch(logout());
            }
        ).catch(err => {
                dispatch(logout());
                redirectToHome();
            }
        )
    }
}


export function passwordRecoverRequest(data) {
    const dataToBePosted = {
        "target": data.target,
        "email": data.email,
        "mobile": data.mobile,
        "country_code": data.country_code
    };

    return dispatch => {
        return postForm(dataToBePosted, BACKEND_ROUTES.AUTHENTICATION.PASSWORD.RECOVER).then(res => {
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

    const paramsToBePosted = {
        "identifier": params.identifier,
        "id": params.id
    };

    return dispatch => {
        return postForm(dataToBePosted, BACKEND_ROUTES.AUTHENTICATION.PASSWORD.RESET, paramsToBePosted).then(res => {
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
        return postForm(dataToBePosted, BACKEND_ROUTES.AUTHENTICATION.PASSWORD.CHANGE).then(res => {
                redirectTo('/');
                dispatch(addFlashMessage({
                    type: 'success',
                    text: res.data.msg
                }))
            }
        );
    }
}

/** sets default gym in redux store as well as local storage
 * @param gymDetails => object {gym_id, gym_name, locality}
 */
export const setDefaultGym = (gymDetails) => {
    const {gym_id, gym_name, locality} = gymDetails;
    const defaultGym = {
        "gym_id": gym_id,
        "gym_name": gym_name,
        "locality": locality,
    };
    localStorage.setItem('selectedGym', JSON.stringify(defaultGym));
    return dispatch =>
        dispatch(saveSelectedGym(defaultGym))
};