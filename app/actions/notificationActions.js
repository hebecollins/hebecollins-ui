import {get, postJSON} from "../Toolbox/Helpers/requestHandler";
import {BACKEND_ROUTES} from "../../config/backendRoutes";

export const getNotifications = () => {
    return get(BACKEND_ROUTES.COMMONS.NOTIFICATION);
};

export const getUnreadNotificationCount = () => {
    return get(BACKEND_ROUTES.COMMONS.NOTIFICATION_COUNT);
};

/**Marks notifications as read on the server
 * @param ids => array of notification Ids which has to be marked as read
 * */
export const markNotificationAsRead = (ids) => {
    const dataToBePosted = {
      ids : ids
    };
    return postJSON(dataToBePosted, BACKEND_ROUTES.COMMONS.NOTIFICATION_UPDATE)
};