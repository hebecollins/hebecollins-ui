import {combineReducers} from 'redux';
import flashMessages from './reducers/flashMessages';
import auth from './reducers/currentUser';
import addUsers from "./reducers/addUsers"
import verificationData from "./reducers/verification"

/** A reducer is basically something that takes action and state and gives back the new state
 * combine all the reducers into one big state
 * */
export default combineReducers({
    flashMessages,
    auth,
    addUsers,
    verificationData
});