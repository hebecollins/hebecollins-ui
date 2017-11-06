import {
    ADD_FLASH_MESSAGE, CLEAR_QUOTES, CLEAR_WORKOUT, DELETE_FLASH_MESSAGE, DELETE_SELECTED_GYM, DELETE_SELECTED_USER,
    LOGOUT,
    SELECTED_GYM
} from './types'
import {STORE_VERIFICATION_DATA,ADD_QUOTE,ADD_WORKOUT,SET_CURRENT_USER, SELECTED_USER} from "./types";


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
export const setCurrentUser=(user)=> {
    return {
        type: SET_CURRENT_USER,
        user
    };
};

export const logout=()=> {
    return {
        type: LOGOUT,
    };
};

/** stores selected user's information to redux store
 *  NOTE: Current user should not be confused with selected user.
 *        Current user is logged in user.
 *        selected user is the user whose information current user is trying to access**
 * @param selectedUser=> object {user_id, user_type, nickName}
 */
export const saveSelectedUser = (selectedUser) => {
    return {
        type: SELECTED_USER,
        selectedUser:selectedUser
    }
};

/** deleted selected user's data
 */
export const deleteSelectedUser = () => {
    return {
        type: DELETE_SELECTED_USER,
    }
};

/**Saves gym details in redux store
 * @param selectedGym => object {gym_id, gym_name, locality}
 */
export const saveSelectedGym = (selectedGym) => {
    return {
        type: SELECTED_GYM,
        selectedGym:selectedGym
    }
};


/**deletes gym details in redux store
 */
export const deleteSeletedGym = ( ) => {
    return {
        type: DELETE_SELECTED_GYM,
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
 * @param workout => object {day:[workouts]}
 */
export const addWorkout=(workout)=> {
    return {
        type: ADD_WORKOUT,
        workout: workout
    }
};

export const clearWorkout=()=>{
    return {
        type: CLEAR_WORKOUT
    }
};