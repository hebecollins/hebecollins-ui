import { combineReducers } from 'redux';
import flashMessages from './reducers/flashMessages'

/** A reducer is basically something that takes action and state and gives back the new state
 * combine all the reducers into one big state
 * */
export default combineReducers({
   flashMessages
});