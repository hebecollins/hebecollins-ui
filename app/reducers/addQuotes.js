import {ADD_QUOTES,CLEAR_QUOTES} from "../actions/types";
import shortid from 'shortid';

export default (state = [], action = {}) => {
    switch (action.type) {
        case ADD_QUOTES: {
            return [
                ...state,
                {
                    id: shortid.generate(),
                    author: action.author,
                    quote: action.quote
                }
            ]
        }

        case CLEAR_QUOTES: {
            return []
        }

        default:
            return state;
    }
}