import {ADD_WORKOUT, ADD_WORKOUT_FOR, CLEAR_WORKOUT} from "../actions/types";

const initialState = {
    workout: {}
};

export default (state = initialState, action = {}) => {
    switch (action.type) {
        case ADD_WORKOUT: {
            return {
                workout: Object.assign(state.workout, action.workout)
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