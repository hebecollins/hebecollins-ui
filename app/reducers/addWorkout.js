import {ADD_WORKOUT} from "../actions/types";

const initialState = {
    workout:{}
};

export default (state= initialState,action={})=> {
    switch (action.type) {
        case ADD_WORKOUT: {
            return {
                workout:Object.assign(state.workout,action.workout)
            }
        }

        default:
            return state;
    }
}