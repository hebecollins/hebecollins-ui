import {ADD_WORKOUT, ADD_WORKOUT_FOR, CLEAR_WORKOUT} from "../actions/types";
import {deepCloneObject} from "../Toolbox/Helpers/extra";

const initialState = {
    workout: {}
};

export default (state = initialState, action = {}) => {
    switch (action.type) {
        case ADD_WORKOUT: {
            const temp = deepCloneObject(state.workout);
            return {
                workout: Object.assign(temp, action.workout)
            }
        }

        case CLEAR_WORKOUT: {
            return {
                workout:{}
            }
        }

        default:
            return state;
    }
}