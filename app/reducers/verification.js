import {STORE_VERIFICATION_DATA} from "../actions/types"

const initialState = {
    userId: ''
};

export default (state = initialState, action = {}) => {
    switch (action.type) {
        case STORE_VERIFICATION_DATA: {
            return {
                userId: action.userId
            };
        }

        default:
            return state;
    }
}