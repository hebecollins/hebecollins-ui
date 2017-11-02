import {ADD_WORKOUT, ADD_WORKOUT_FOR} from "../actions/types";

const initialState = {
    workout:{},
    clientId:""
};

export default (state= initialState,action={})=> {
    switch (action.type) {
        case ADD_WORKOUT: {
            return {
                workout:Object.assign(state.workout,action.workout),
                clientId:state.clientId
            }
        }

        case ADD_WORKOUT_FOR: {
            return {
                workout:state.workout,
                clientId:action.clientId
            }
        }

        default:
            return state;
    }
}