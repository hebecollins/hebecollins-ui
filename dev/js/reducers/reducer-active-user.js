export default function (state = null, action) {
    switch (action.type ){
        case "USER_SELECTED": {// how is action defined?
            console.log(action);
            return action.payload;
        }
            break;
    }
    console.log("state"+state);
    return state;
}