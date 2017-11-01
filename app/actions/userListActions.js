/** Gets client list from the server
 */
import {get} from "../Toolbox/Helpers/requestHandler";
import {BACKEND_ROUTES} from "../../config/backendRoutes";
import {store} from "../index"
import {addFlashMessage} from "./flashMessageActions";
import {message} from "../Toolbox/Helpers/messages";
import {errorResponse} from "../Toolbox/Helpers/responseHandler";

export const clientListForTrainer = (gymId) => {
    const route = `/${gymId}${BACKEND_ROUTES.LIST.TRAINER.CLIENT_LIST}`;
    return get(route)
};