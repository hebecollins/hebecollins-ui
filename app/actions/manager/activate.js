import {postJSON} from '../../Toolbox/Helpers/requestHandler';
import {redirectTo, redirectToHome} from "../../Toolbox/Helpers/redirect";
import {STORE_VERIFICATION_DATA} from "../types"
import {addFlashMessage} from "../commons/flashMessages"
import {BACKEND_ROUTES} from "../../../config/backendRoutes";

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


function deleteVerificationData() {
    return {
        type: STORE_VERIFICATION_DATA,
        userId: ""
    }
}
