import {postForm, postJSON} from '../../Toolbox/Helpers/requestHandler';
import backendRoutes from 'backendRoutes';
import {addFlashMessage} from "../commons/flashMessages"
import {redirectTo} from '../../Toolbox/Helpers/redirect';
import {STORE_VERIFICATION_DATA} from "../types";

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
        return postJSON(dataToBeSent, backendRoutes.signup).then(res => {
            console.log(res.data);
            dispatch(storeVerificationData(res.data.data));
            redirectTo('/verify');
        })
    }
}

export function sendOTP(data,userId) {
    const dataToBeSent={
        "otp":data.otp,
        "user_id":userId
    };
    return dispatch => {
        return postForm(dataToBeSent, backendRoutes.verify).then(res => {
            redirectTo('/activate/manager');
        })
    }
}