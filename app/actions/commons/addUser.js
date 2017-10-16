import {ADD_CLIENTS, ADD_TRAINERS} from "../types";
import {redirectToHome} from "../../Toolbox/Helpers/redirect";

function addTrainerToRedux(data) {
    console.log("hello");
    return {
        type: ADD_TRAINERS,
        trainers: data
        // payload:100
    }
}

function addclientToRedux(data) {
    return {
        type: ADD_CLIENTS,
        clients: data
    }
}

export function addUserToDBAndStore(user, userType, route) {
    const userData =
        {
            "nick_name": user.nick_name,
            "email": user.email,
            "mobile": user.mobile,
            "country_code": user.country_code
        };
    return dispatch => {
        // return postJSON(userData, route).then(res => {
        // browserHistory.push('/');
        // console.log(res.data.msg);
        dispatch(addUserToRedux(userType, userData));
        if (user.isSubmitted === true){
            redirectToHome();
        }
    }
}

function addUserToRedux(userType, data) {
    if (userType === 'client') {
        return addclientToRedux(data);
    }
    if (userType === 'trainer') {
        return addTrainerToRedux(data);
    }
}