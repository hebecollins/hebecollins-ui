import {postJSON} from '../../Toolbox/Helpers/requestHandler';
import backendRoutes from 'backendRoutes';
import {ADD_CLIENTS, ADD_TRAINERS} from "../types";
import {store} from "../../index"

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
        console.log("hello brooo");
            return dispatch(addTrainerToRedux(userData));
        // })
    }
}

function addUserToRedux(userType, data) {
    if (userType === 'client') {
        return dispatch=>{
            dispatch(addclientToRedux(data))
        }
    }
    if (userType === 'trainer') {
        console.log(data);
        return dispatch=>{
            dispatch(addTrainerToRedux(data))
        }
    }
}