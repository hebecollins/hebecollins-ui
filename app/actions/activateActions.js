import {postJSON} from '../Toolbox/Helpers/requestHandler';
import {redirectTo, redirectToHome} from "../Toolbox/Helpers/redirect";
import {STORE_VERIFICATION_DATA} from "./types"
import {addFlashMessage} from "./flashMessageActions"
import {BACKEND_ROUTES} from "../../config/backendRoutes";


/**(OTP activation)
 * sends an activation request for a manager after formatting the data in acceptable format
 * @param data => it is state of class Activate, which has all the user input including some unnecessary fields
 *                  like isLoading and errors which is removed by this method before sending it to the
 *                  server
 * @param userId => It is sent back by the server at the time of registering, and it is stored in
 *                  redux store.Server should know that which is the user for whom request is received
 * @return * => returns an http response from the server
 */
export function activateManagerRequest(data, userId) {
    const dataToBeSent = {
        first_name: data.first_name,
        middle_name: data.middle_name,
        last_name: data.last_name,
        dob: data.dob,
        gender: data.gender,
        password: data.password,
        password_confirm: data.password_confirm,
        gym_name: data.gym_name,
        street_address: data.street_address,
        locality: data.locality,
        district: data.district,
        pin: data.pin,
        state: data.state,
        country: data.country,
    };
    const param = {
        user_id: userId
    };

    return dispatch => {
        return postJSON(dataToBeSent, BACKEND_ROUTES.ACTIVATE.MANAGER, param).then(res => {
            redirectTo('/');
            dispatch(addFlashMessage({
                type: 'success',
                text: res.data.msg
            }));
            dispatch(deleteVerificationData());
        });
    }
}


/**(Link activation)
 * sends an activation request for a manager after formatting the data in acceptable format
 * @param data => it is state of class ActivateTrainer, which has all the user input including some unnecessary fields
 *                  like isLoading and errors which is removed by this method before sending it to the
 *                  server
 * @param params => it has activation identifier and userId which was sent by the server to the
 *                  user's mobile in form of a link
 * @return * => returns an http response from the server
 */
export function activateTrainer(data, params) {
    const dataToBeSent = {
        first_name: data.first_name,
        middle_name: data.middle_name,
        last_name: data.last_name,
        dob: data.dob,
        gender: data.gender,
        password: data.password,
        password_confirm: data.password_confirm,
    };

    const paramsToBePosted = {
        "identifier": params.identifier,
        "id": params.id
    };

    return dispatch => {
        return postJSON(dataToBeSent, BACKEND_ROUTES.ACTIVATE.TRAINER, paramsToBePosted).then(res => {
            redirectToHome();
            dispatch(addFlashMessage({
                type: 'success',
                text: res.data.msg
            }));
        });
    }
}

/**(Link activation)
 * sends an activation request for a manager after formatting the data in acceptable format
 * @param data => it is state of class ActivateClient, which has all the user input including some unnecessary fields
 *                  like isLoading and errors which is removed by this method before sending it to the
 *                  server
 * @param params => it has activation identifier and userId which was sent by the server to the
 *                  user's mobile in form of a link
 * @return * => returns an http response from the server
 */
export function activateClient(data, params) {
    const dataToBeSent = {
        first_name: data.first_name,
        middle_name: data.middle_name,
        last_name: data.last_name,
        dob: data.dob,
        gender: data.gender,
        password: data.password,
        password_confirm: data.password_confirm,
    };

    const paramsToBePosted = {
        "identifier": params.identifier,
        "id": params.id
    };

    return dispatch => {
        return postJSON(dataToBeSent, BACKEND_ROUTES.ACTIVATE.CLIENT, paramsToBePosted).then(res => {
            redirectToHome();
            dispatch(addFlashMessage({
                type: 'success',
                text: res.data.msg
            }));
        });
    }
}

/**Activation data consist of userId, which is stored in redux store. Once account has been activated
 * it should be deleted.
 * this method is called just to do that
 */
function deleteVerificationData() {
    return {
        type: STORE_VERIFICATION_DATA,
        userId: ""
    }
}