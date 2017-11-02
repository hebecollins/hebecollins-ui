/** Gets client list from the server
 */
import {get} from "../Toolbox/Helpers/requestHandler";
import {BACKEND_ROUTES} from "../../config/backendRoutes";
import {ADD_WORKOUT_FOR} from "./types";

export const clientListForTrainer = (gymId) => {
    const route = `/${gymId}${BACKEND_ROUTES.LIST.TRAINER.CLIENT_LIST}`;
    return get(route)
};

/**Adds client Id for adding workout
 */
export const storeClientIdToRedux = (clientId) => {
    return dispatch => {
        return dispatch({
            type:ADD_WORKOUT_FOR,

        })
    }
};