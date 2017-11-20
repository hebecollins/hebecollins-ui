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
    const route = `/${gymId}${BACKEND_ROUTES.COMMONS.TRAINER_LIST}`;
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
export const postRemarkToServer = (remarks, userId,gymId) => {
    const dataToBePosted = {
        "remarks":remarks
    };
    const route = `/${gymId}${BACKEND_ROUTES.COMMONS.REMARKS}/${userId}`;
    return postJSON(dataToBePosted, route)
};

/** adding selected users basic information to localStorage and redux to make it available even if page refreshes
 */
export const addSelectedUserToRedux=(userId,userType,nickName)=>{
    const selectedUser = {
        "user_id":userId,
        "user_type":userType,
        "nick_name":nickName
    };
    return dispatch => {
        localStorage.setItem('selectedUser', JSON.stringify(selectedUser));
        return dispatch(saveSelectedUser(selectedUser))
    }
};

/** adding selected trainers information to localStorage and redux to make it available even if page refreshes
 */
export const addSelectedTrainerToRedux=(userDetails)=>{
    const selectedUser = {
        "trainer_id":userDetails.trainer_id,
        "name":userDetails.name,
        "img_thumb":userDetails.img_thumb,
        "nick_name":userDetails.nick_name,
        "rank":userDetails.rank

    };

    return dispatch => {
        localStorage.setItem('selectedUser', JSON.stringify(selectedUser));
        return dispatch(saveSelectedUser(selectedUser))
    }
};



export const deleteSelectedUserFromRedux = ()=>{
  return dispatch=>{
   dispatch(deleteSelectedUser());
  }
};