import {get, postJSON} from "../Toolbox/Helpers/requestHandler";
import {BACKEND_ROUTES} from "../../config/backendRoutes";
import {deleteSelectedUser, saveSelectedUser} from "./actionStore";

/** clientList for trainer
 */
export const clientListForTrainer = (gymId) => {
    const route = `/${gymId}${BACKEND_ROUTES.TRAINER.CLIENT_LIST}`;
    return get(route)
};

/** clientList for manager
 */
export const clientListForManager = (gymId) => {
    const route = `/${gymId}${BACKEND_ROUTES.MANAGER.CLIENT_LIST}`;
    return get(route)
};

/** trainerList for manager
 */
export const trainerListForManager = (gymId) => {
    const route = `/${gymId}${BACKEND_ROUTES.MANAGER.TRAINER_LIST}`;
    return get(route)
};

/** trainerList for client
 */
export const trainerListForClient = (gymId) => {
    const route = `/${gymId}${BACKEND_ROUTES.COMMONS.TRAINER_LIST}`;
    return get(route)
};


/** posting remark to server
 */
export const postRemarkToServer = (remarks, userId, gymId) => {
    const dataToBePosted = {
        "remarks": remarks
    };
    const route = `/${gymId}${BACKEND_ROUTES.COMMONS.REMARKS}/${userId}`;
    return postJSON(dataToBePosted, route)
};

/** adding selected users basic information to localStorage and redux to make it available even if page refreshes
 */
export const addSelectedClientToRedux = (clientDetails) => {
    const selectedUser = {
        "client_id": clientDetails.client_id,
        "nick_name": clientDetails.nick_name,
        "name":clientDetails.name,
        "img_thumb":clientDetails.img_thumb
    };
    return dispatch => {
        localStorage.setItem('selectedUser', JSON.stringify(selectedUser));
        return dispatch(saveSelectedUser(selectedUser))
    }
};

/** adding selected trainers information to localStorage and redux to make it available even if page refreshes
 */
export const addSelectedTrainerToRedux = (trainerDetails) => {
    const selectedUser = {
        "trainer_id": trainerDetails.trainer_id,
        "name": trainerDetails.name,
        "img_thumb": trainerDetails.img_thumb,
        "nick_name": trainerDetails.nick_name,
        "rank": trainerDetails.rank
    };

    return dispatch => {
        localStorage.setItem('selectedUser', JSON.stringify(selectedUser));
        return dispatch(saveSelectedUser(selectedUser))
    }
};
