import {CLEAR_EXERCISE_LIST, STORE_EXERCISE_LIST} from '../actions/types'

const intialState = {
    exercises:[]
};
export default (state = intialState, action = {}) => {
    switch (action.type) {
        case STORE_EXERCISE_LIST:
            return {
                exercises: action.exercises
            };

        case CLEAR_EXERCISE_LIST:
            return {
                exercises: []
            };

        default:
            return state;
    }
}