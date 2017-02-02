import UserApi from '../api/UserApi';
import * as types from './actionTypes';
import {beginAjaxCall, ajaxCallError} from './ajaxStatusActions';

function signupUserSuccess(user) {
  return {type: types.USER_CHANGE_PROFILE_SUCCESS, user:user};
}
function signupUserFail(error) {
  return {type: types.USER_CHANGE_PROFILE_FAIL, error:error};
}

export function userChangeProfile(formData, upload) {
  return dispatch => {
    dispatch(beginAjaxCall());    
    return UserApi.setUserProfile(formData, upload, localStorage.getItem('token')).then(user => {
        dispatch(signupUserSuccess(user.details));
    }).catch(error => {
        dispatch(signupUserFail(error.err));      
    });
  };
}

