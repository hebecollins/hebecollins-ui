import {get} from "../Toolbox/Helpers/requestHandler";
import {BACKEND_ROUTES} from "../../config/backendRoutes";

export const getNotifications=()=>{
    return get(BACKEND_ROUTES.COMMONS.NOTIFICATION);
};

export const getUnreadNotificationCount=()=>{
    return get(BACKEND_ROUTES.COMMONS.NOTIFICATION_COUNT);
};