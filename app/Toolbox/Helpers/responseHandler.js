import {addFlashMessage} from "../../actions/commons/flashMessages"
import {message} from "./messages";
import {store} from '../../index'

export function errorResponse(err) {

    console.log(err);
    if (typeof err.response === 'undefined') {
            store.dispatch(addFlashMessage({
                type: 'error',
                text: message.badConnection
            }));
        return {};
    }

    if (typeof err.response.data === 'undefined') {
        store.dispatch(addFlashMessage({
            type: 'error',
            text: message.errorAtServer
        }));
        return {};
    }

    if (!(typeof err.response.data.msg === 'undefined')) {
        store.dispatch(addFlashMessage({
            type: 'error',
            text: err.response.data.msg
        }));
        return {};
    }

    if (!(typeof err.response.data.errors === 'undefined')) {
        return err.response.data.errors;
    }


    if (!(typeof err.response.data.warning === 'undefined')) {
        return {};
    }

//if none of those condition satisfied
    store.dispatch(addFlashMessage({
        type: 'error',
        text: message.errorAtServer
    }));
    return {}
}
