import {userActionTypes} from "../_actions/user.actions.types";

const iState = {
    loggedIn: false,
    userDetails: {}
}
//reducer changes data only to the store
const reducer = (state=iState, action) => {
    if(action.type == userActionTypes.LOGIN_SUCCESS) {
        return {
            loggedIn: action.payload.isLoggedIn,
            userDetails: action.payload.userData
        }
    }
    return state;
}

export default reducer;