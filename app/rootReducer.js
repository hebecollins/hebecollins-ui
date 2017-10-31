import {combineReducers} from 'redux';
import flashMessages from './reducers/flashMessageReducer';
import auth from './reducers/currentUserReducer';
import verificationData from "./reducers/verificationReducer"
import quotes from "./reducers/quoteReducer"
import workout from "./reducers/workoutReducer"

/** A reducer is basically something that takes action and state and gives back the new state
 * combine all the reducers into one big state
 * */
export default combineReducers({
    flashMessages,
    auth,
    workout,
    verificationData,
    quotes
});