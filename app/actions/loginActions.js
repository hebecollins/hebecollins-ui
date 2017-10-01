import {postForm} from '../Toolbox/Helpers/requestHandler';
import backendRoutes from 'backendRoutes';
import setAuthToken from '../Toolbox/Auth/SetAuthToken'
import {SET_CURRENT_USER} from "./types";

export function setCurrentUser(user) {
    return{
        type: SET_CURRENT_USER,
        user
    };
}

export function loginRequest(data) {

    const dataToBePosted = {
        "identifier": data.identifier,
        "password": data.password,
        "remember": data.remember
    };

    return dispatch => {
        return postForm(dataToBePosted, backendRoutes.login).then(res=>{
            const user = res.data.data;
            localStorage.setItem('user', data);
            setAuthToken(user.token);
            dispatch(setCurrentUser(user))
            }
        );
    }
}