import {SELECTED_USER,DELETE_SELECTED_USER} from "../actions/types";

const initialState={};

export default (state= initialState, action={})=>{
    switch (action.type) {
        case SELECTED_USER:
            return {
              user_id:action.userId,
              user_type:action.userType,
              nick_name:action.nickName
            };

        case DELETE_SELECTED_USER:
            return {};

        default:
            return state
    }
}