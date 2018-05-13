import {DELETE_SELECTED_GYM, SELECTED_GYM} from "../actions/types";

const initialState = {};

export default (state = initialState, action = {}) => {
    switch (action.type) {
        case SELECTED_GYM:
            return {
                gym_id: action.selectedGym.gym_id,
                gym_name: action.selectedGym.gym_name,
                locality: action.selectedGym.locality
            };

        case DELETE_SELECTED_GYM:
            return {};

        default:
            return state
    }
}