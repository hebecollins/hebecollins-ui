import {DELETE_SELECTED_LABEL, SELECTED_LABEL} from "../actions/types";

const initialState = {};

export default (state = initialState, action = {}) => {
    switch (action.type) {
        case SELECTED_LABEL:
            return {
                labelId: action.labelId,
                label: action.label,
            };

        case DELETE_SELECTED_LABEL:
            return {};

        default:
            return state
    }
}