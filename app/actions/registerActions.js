import {postForm, postJSON} from '../Toolbox/Helpers/requestHandler';
import {redirectByName} from '../Toolbox/Helpers/redirect';
import {STORE_VERIFICATION_DATA} from "./types";
import {BACKEND_ROUTES} from "../../config/backendRoutes";
import {addFlashMessage} from "./flashMessageActions";
import {store} from "../index"

/*contains all the actions that are involved in registering a user which includes manager registration
  addition of clients and trainers
*/


/** sends an OTP request to the server
 */
export function sendOTP(data, userId) {
    const dataToBeSent = {
        "otp": data.otp,
        "user_id": userId
    };
    return dispatch => {
        return postForm(dataToBeSent, BACKEND_ROUTES.VERIFY).then(res => {
            redirectByName('ACTIVATE_MANAGER');
            dispatch(addFlashMessage({
                type: 'success',
                text: res.data.msg
            }));
        })
    }
}

/** sends a resend OTP request to the server
 */
export function resendOTP(userId) {
    const dataToBeSent = {
        "user_id": userId
    };
    return dispatch => {
        return postForm(dataToBeSent, BACKEND_ROUTES.RESEND_OTP).then(res => {
            dispatch(addFlashMessage({
                type: 'success',
                text: res.data.msg
            }));
        })
    }
}

/**Registering a manager is done by signing up by the manager itself, so manager will be
 * activating his account right then. That is why he needs to be redirected to the required
 * pages.
 * @param data => it is the pure state passed out of which only given fields are sent to the server
 * @return object => return a response object from the server
 */
export function registerManager(data) {
    const dataToBeSent = {
        "nick_name": data.nick_name,
        "email": data.email,
        "mobile": data.mobile,
        "country_code": data.country_code
    };
    return dispatch => {
        return postJSON(dataToBeSent, BACKEND_ROUTES.SIGNUP).then(res => {
            dispatch(storeVerificationData(res.data.data.user_id));
            redirectByName('VERIFY');
            dispatch(addFlashMessage({
                type: 'success',
                text: res.data.msg
            }));
        })
    }
}

/** Registering a trainer doesn't require a redirect, as the manager might want to add multiple
 *  trainers, so needs to stay on the same page after response has received
 * @param data => it is the pure state passed out of which only given fields are sent to the server
 * @param gymId => It is passed by the component based on the current selected gym
 * */
export function registerTrainer(data, gymId) {
    const route = `/${gymId}${BACKEND_ROUTES.ADD.TRAINER}`;
    return register(data, route)
}

/** Registering a client doesn't require a redirect, as the trainer might want to add multiple
 *  clients, so needs to stay on the same page after response has received
 * @param data => it is the pure state passed out of which only given fields are sent to the server
 * @param gymId => It is passed by the component based on the current selected gym
 */
export function registerClient(data, gymId) {
    const route = `/${gymId}${BACKEND_ROUTES.ADD.CLIENT}`;
    return register(data, route)}

/**It is used by methods which does not require any redirection after getting reponse from
 * the server.
 * @param data => it is the pure state passed out of which only given fields are sent to the server
 * @param route => backend route at which request has to be made
 * @return object => return a response object from the server
 *  */
function register(data, route) {
    const dataToBeSent = {
        "nick_name": data.nick_name,
        "email": data.email,
        "mobile": data.mobile,
        "country_code": data.country_code
    };
    return postJSON(dataToBeSent, route).then(res => {
        store.dispatch(addFlashMessage({
            type: 'success',
            text: res.data.msg
        }));
    })
}

/** It stores userId in redux store so that with each request(verify and activate), userId
 *  can be sent for the server to detect which user has to be registered
 * */
function storeVerificationData(userId) {
    return {
        type: STORE_VERIFICATION_DATA,
        userId: userId
    }
}