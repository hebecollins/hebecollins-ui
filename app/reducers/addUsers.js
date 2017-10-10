import {ADD_CLIENTS, ADD_TRAINERS} from "../actions/types";


const initialState = {
    trainers: []
};

export default (state = initialState, action = {}) => {
    switch (action.type) {
        case ADD_TRAINERS:
            // return state + action.payload;
            // state.result += action.payload;
        // state =[...state,
            {
                 state={
                     trainers:[...state.trainers, action.trainers]}
            }
        // ];
            break;

        case ADD_CLIENTS:
            state.result += action.payload;
            break;
        // return [
        //     ...state,
        //     {
        //         clients: [...state.clients, action.clients]
        //     }
        // ];

    }
    // console.log(state);
    return state;
}