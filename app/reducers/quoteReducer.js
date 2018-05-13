import {ADD_QUOTE,CLEAR_QUOTES} from "../actions/types";
import shortid from 'shortid';

export default (state = [], action = {}) => {
    switch (action.type) {
        case ADD_QUOTE: {
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