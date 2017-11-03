import {
    ADD_FLASH_MESSAGE, CLEAR_QUOTES, DELETE_FLASH_MESSAGE, DELETE_SELECTED_USER, SELECTED_USER,
    SET_CURRENT_USER
} from './types'
import {STORE_VERIFICATION_DATA,ADD_QUOTE,ADD_WORKOUT} from "./types";

/** adds flash message to redux store
 * @param message => object {type, text}. type can be 'error' or 'success'
 */
export function addFlashMessage(message) {
    return {
        type: ADD_FLASH_MESSAGE,
        message
    }
}

/** deletes flash message
 * @param id => string id of the flash message which is required to be deleted
 */
export function deleteFlashMessage(id) {
    return {
        type: DELETE_FLASH_MESSAGE,
        id
    }
}


/**Stores logged in user's information to redux
 * @param user => object {nick_name, token, token_expire,user_id, user_type, gym_list}
 */
export function setCurrentUser(user) {
    return {
        type: SET_CURRENT_USER,
        user
    };
}

/** stores selected user's information to redux store
 *  NOTE: Current user should not be confused with selected user.
 *        Current user is logged in user.
 *        selected user is the user whose information current user is trying to access**
 * @param userId => userId of selected user
 * @param nickName => nickName of selected user
 * @param userType => userType('manager','trainer','client','admin') of selected user
 */
export const saveSelectedUser = (userId, userType, nickName) => {
    return {
        type: SELECTED_USER,
        userId: userId,
        userType: userType,
        nickName: nickName,
    }
};

/** deleted selected user's data
 */
export const deleteSelectedUser = () => {
    return {
        type: DELETE_SELECTED_USER,
    }
};


/** It stores userId in redux store so that with each request(verify and activate), userId
 *  can be sent for the server to detect which user has to be registered
 * */
export const storeVerificationData = (userId) => {
    return {
        type: STORE_VERIFICATION_DATA,
        userId: userId
    }
};


/**Activation data consist of userId, which is stored in redux store. Once account has been activated
 * it should be deleted.
 * this method is called just to do that
 */
export const deleteVerificationData = () => {
    return {
        type: STORE_VERIFICATION_DATA,
        userId: ""
    }
};

/** Adding quotes
 */
export const addQuote = (author, quote) => {
    return {
        type: ADD_QUOTE,
        author: author,
        quote: quote
    }
};

/** clearing all the quotes
 */
export const clearQuotes = () => {
    return {
        type: CLEAR_QUOTES,
    }
};

/**adds workout to redux
 * @param workout => object {day=>[workouts]}
 */
export const addWorkout=(workout)=> {
    return {
        type: ADD_WORKOUT,
        workout: workout
    }
}

