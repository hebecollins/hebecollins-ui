import {ADD_WORKOUT} from "../actions/types";

const initialState = {
    sun:[],
    tue:[],
    wed:[],
    thu:[],
    fri:[],
    sat:[]
};

export default addWorkout=(state= initialState,action={})=> {
    switch (action.type) {
        case ADD_WORKOUT: {
            return [...state,
                {
                    sun:action.sun
                }
            ]
        }
            break;
    }
}