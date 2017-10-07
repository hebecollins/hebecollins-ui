import {postJSON} from '../../Toolbox/Helpers/requestHandler';
import backendRoutes from 'backendRoutes';

export function activateManagerRequest(data,params={}) {
    delete data.errors;
    delete data.isLoading;

    return dispatch => {
        return postJSON(data, backendRoutes.activate, params);
    }
}