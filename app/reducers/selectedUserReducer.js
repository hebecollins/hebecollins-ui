import {SELECTED_USER,DELETE_SELECTED_USER} from "../actions/types";

const initialState={};

export default (state= initialState, action={})=>{
    switch (action.type) {
        case SELECTED_USER:
            return {
              user_id:action.selectedUser.user_id,
              user_type:action.selectedUser.user_type,
              nick_name:action.selectedUser.nick_name
            };

        case DELETE_SELECTED_USER:
            return {};

        default:
            return state
    }
}