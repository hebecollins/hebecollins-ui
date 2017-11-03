import {addFlashMessage,setCurrentUser} from "../../actions/actionStore"
import {message} from "./messages";
import {store} from '../../index'
import {redirectToHome} from "./redirect";
import setAuthToken from "../Auth/SetAuthToken";

/**If server sends anything other than status 200, this function will be called and if, it has
 * anything other than validation error, it will either redirect or show that as error message to the user
 * @param err => err response directly from the server
 * @return object => empty object in case of non-validation errors OR error List in case of validation errors
 **/
export function errorResponse(err) {

    /** IF err does not have a response field(mostly happens because of issue from UI side)for eg. CORS error,
     *  it will delete the current user Data from local storage and redux store and then it will redirect to home page
     *  ELSE show that error as a flash message
     * */
    if (typeof err.response === 'undefined') {
        if (store.getState().auth.isAuthenticated === true) {
            console.log("errorResponse");
            console.log(err);
            localStorage.removeItem('user');
            setAuthToken(false);
            store.dispatch(setCurrentUser({}));
            redirectToHome();
            return null;
        }
        else {
            store.dispatch(addFlashMessage({
                type: 'error',
                text: message.badConnection
            }));
            return {};
        }

    }


    /**IF err do have a response field but it is some kind of exception from the server with no specific
     * format. So no data field. It will throw an alert to the user with 'errorAtServer' message
     * */
    if (typeof err.response.data === 'undefined') {
        store.dispatch(addFlashMessage({
            type: 'error',
            text: message.errorAtServer
        }));
        return {};
    }


    /**IF err has a 'msg' field it will show that to the user as error alert (sent by the server in this format).
     * */
    if (!(typeof err.response.data.msg === 'undefined')) {
        store.dispatch(addFlashMessage({
            type: 'error',
            text: err.response.data.msg
        }));
        return {};
    }


    /** IF err has 'errors' field, it will return those as validation errors through 'helper-blocks'
     * */
    if (!(typeof err.response.data.errors === 'undefined')) {
        return err.response.data.errors;
    }


    /** IF err has a warning field it means UI is sending something that is not allowed.
     *  It is just meant for debugging purpose and will have no effect on the UI
     * */
    if (!(typeof err.response.data.warning === 'undefined')) {
        return {};
    }

    /**IF err has a 'msg' field it will show that to the user as error alert (sent by the server in this format).
     * */
    if (!(typeof err.response.data.forbidden === 'undefined')) {
        store.dispatch(addFlashMessage({
            type: 'error',
            text: err.response.data.forbidden
        }));
        redirectToHome();
        return null;
    }


    /** IF none of those condition satisfied.
     * */
    store.dispatch(addFlashMessage({
        type: 'error',
        text: message.errorAtServer
    }));
    return {}
}