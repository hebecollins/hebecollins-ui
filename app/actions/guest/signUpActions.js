import {postForm, postJSON} from '../../Toolbox/Helpers/requestHandler';
import {redirectTo} from '../../Toolbox/Helpers/redirect';
import {STORE_VERIFICATION_DATA} from "../types";
import {BACKEND_ROUTES} from "../../../config/backendRoutes";
import {addFlashMessage} from "../commons/flashMessages";

function storeVerificationData(data) {
    console.log(data);
    return{
        type: STORE_VERIFICATION_DATA,
        userId:data.user_id
    }
}

export function userSignUpRequest(data) {
    const dataToBeSent={
      "nick_name":data.nick_name,
      "email":data.email,
      "mobile":data.mobile,
      "country_code":data.country_code
    };
    return dispatch => {
        return postJSON(dataToBeSent, BACKEND_ROUTES.SIGNUP).then(res => {
            dispatch(storeVerificationData(res.data.data));
            redirectTo('/verify');
            dispatch(addFlashMessage({
                type: 'success',
                text: res.data.msg
            }));
        })
    }
}

export function sendOTP(data,userId) {
    const dataToBeSent={
        "otp":data.otp,
        "user_id":userId
    };
    return dispatch => {
        return postForm(dataToBeSent, BACKEND_ROUTES.VERIFY).then(res => {
            redirectTo('/activate/manager');
        })
    }
}