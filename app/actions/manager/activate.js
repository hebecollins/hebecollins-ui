import {postJSON, get} from '../../Toolbox/Helpers/requestHandler';
import backendRoutes from 'backendRoutes';

export function activateManagerRequest(data,params={}) {
    console.log("inside action");
    delete data.errors;
    delete data.isLoading;
    return dispatch => {
        return postJSON(data, backendRoutes.activate, params);
    }
}