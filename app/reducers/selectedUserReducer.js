import {SELECTED_USER,DELETE_SELECTED_USER} from "../actions/types";

const initialState={};

export default (state= initialState, action={})=>{
    switch (action.type) {
        case SELECTED_USER:
            return action.selectedUser;

        case DELETE_SELECTED_USER:
            return {};

        default:
            return state
    }
}