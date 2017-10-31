import {BACKEND_ROUTES} from "../../config/backendRoutes"
import {get, postJSON} from "../Toolbox/Helpers/requestHandler"
import {ADD_QUOTES, CLEAR_QUOTES} from "./types";
import {store} from "../index"
import {redirectToHome} from "../Toolbox/Helpers/redirect";
import {addFlashMessage} from "./flashMessageActions";

/** gets quote from the server
 */
export function getQuote() {
        return get(BACKEND_ROUTES.QUOTE)
}

/**post quotes to redux store without pushing it to server
 */
export function postQuotesToReduxStore(data) {
    return dispatch => {
        dispatch({
            type: ADD_QUOTES,
            author: data.author,
            quote: data.quote
        });
    }
}

/** takes data directly from the redux store and push to server
 */
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