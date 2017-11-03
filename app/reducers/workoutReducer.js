import {ADD_WORKOUT, ADD_WORKOUT_FOR} from "../actions/types";

const initialState = {
    workout:{}
};

export default (state= initialState,action={})=> {
    switch (action.type) {
        case ADD_WORKOUT: {
            return {
                workout:Object.assign(state.workout,action.workout),
                clientId:state.clientId
            }
        }

        default:
            return state;
    }
}