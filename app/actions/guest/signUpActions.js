import {postForm, postJSON} from '../../Toolbox/Helpers/requestHandler';
import backendRoutes from 'backendRoutes';
import {addFlashMessage} from "../commons/flashMessages"
import {redirect} from '../commons/redirect';
import {STORE_VERIFICATION_DATA} from "../types";

function storeVerificationData(data) {
    console.log(data);
    return{
        type: STORE_VERIFICATION_DATA,
        userId:data.user_id
    }
}

function deleteVerificationData() {
    return{
        type: STORE_VERIFICATION_DATA,
        userId:""
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
            redirect('/verify');
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
            dispatch(deleteVerificationData());
            redirect('/manager/activate');
        })
    }
}