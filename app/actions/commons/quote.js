import {BACKEND_ROUTES} from "../../../config/backendRoutes"
import {get, postJSON} from "../../Toolbox/Helpers/requestHandler"
import {ADD_QUOTES, CLEAR_QUOTES} from "../types";
import {store} from "../../index"
import {redirectToHome} from "../../Toolbox/Helpers/redirect";
import {addFlashMessage} from "./flashMessages";

export function getQuote() {
    return dispatch => {
        return get(BACKEND_ROUTES.QUOTE)
    }
}

export function postQuotesToReduxStore(data) {
    return dispatch => {
        dispatch({
            type: ADD_QUOTES,
            author: data.author,
            quote: data.quote
        });
    }
}

export function postQuotesToServer() {
    const data = store.getState().quotes;
    const dataToBeSent = data.map(item => {
        let res = Object.assign({}, item);//cloning object and deleting a row from cloned one and returning that to avoid mutation
        delete res['id'];
        return res;
    });

    return dispatch => {
        return postJSON(dataToBeSent, BACKEND_ROUTES.QUOTE).then(res => {
                dispatch({type: CLEAR_QUOTES});
                dispatch(addFlashMessage({
                    type:"success",
                    text:res.data.msg
                }));
                redirectToHome();
            }
        )
    }
}