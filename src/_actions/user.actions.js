import {userActionTypes} from './user.actions.types';

export const changeLoggedIn = (isLoggedIn,user) => {
return (dispatch) => {
    dispatch({
        type: userActionTypes.LOGIN_SUCCESS,
        paylod: {isLoggedIn: isLoggedIn, userData: user}
    })
}
};