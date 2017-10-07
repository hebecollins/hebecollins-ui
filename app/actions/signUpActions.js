import {postJSON} from '../Toolbox/Helpers/requestHandler';
import backendRoutes from 'backendRoutes';
import {addFlashMessage} from "./flashMessages"

export function userSignUpRequest(userData) {
    delete userData.errors;
    delete userData.isLoading;

    return dispatch => {
        return postJSON(userData, backendRoutes.signup).then(res => {
                // browserHistory.push('/');
                dispatch(addFlashMessage({
                    type: 'success',
                    text: res.data.msg
                }))
            })
    }
}