import {combineReducers} from 'redux';
import flashMessages from './reducers/flashMessageReducer';
import auth from './reducers/currentUserReducer';
import verificationData from "./reducers/verificationReducer"
import quotes from "./reducers/quoteReducer"
import workout from "./reducers/workoutReducer"
import selectedUser from "./reducers/selectedUserReducer"
import selectedGym from "./reducers/selectedGymReducer"
import selectedLabel from "./reducers/selectedLabelReducer"
import exerciseList from "./reducers/exerciseListReducer"
import {LOGOUT} from "./actions/types";


/** A reducer is basically something that takes action and state and gives back the new state
 * combine all the reducers into one big state
 * */
const appReducer = combineReducers({
    flashMessages,
    auth,
    selectedUser,
    selectedGym,
    selectedLabel,
    workout,
    exerciseList,
    verificationData,
    quotes
});


export default (state, action) => {
    if (action.type === LOGOUT) {
        state = undefined
    }
    return appReducer(state, action)
};