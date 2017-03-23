import { browserHistory } from 'react-router';
import UserApi from '../api/UserApi';
import * as types from './actionTypes';
import {beginAjaxCall, ajaxCallError} from './ajaxStatusActions';


function signupUserSuccess(user) {
  return {type: types.USER_CHANGE_PROFILE_SUCCESS, user:user};
}
function userChangeProfileFail(error) {
  return {type: types.USER_CHANGE_PROFILE_FAIL, error:error};
}

export function userChangeProfile(formData, upload) {
  return dispatch => {
    dispatch(beginAjaxCall());    
    return UserApi.setUserProfile(formData, upload, localStorage.getItem('token')).then(user => {
        dispatch(signupUserSuccess(user.details));
    }).catch(error => {
        dispatch(userChangeProfileFail(error.err));  
		// browserHistory.push('/signin');    
    });
  };
}
export function setUserProductRate(data) {
  return dispatch => {
    return UserApi.setUserProductRate(data, localStorage.getItem('token')).then(data => {
        dispatch({type: types.UPDATE_USER_DATA, data: data.user_data});
        dispatch({type: types.UPDATE_STAR_RATE, stars: data.product_stars});
    }).catch(error => {
        //dispatch(signupUserFail(error.err));      
    });
  };
}
export function setUserFavorite(data) {
  return dispatch => {
    return UserApi.setUserFavorite(data, localStorage.getItem('token')).then(data => {
        dispatch({type: types.UPDATE_USER_FAVORITE, data: data.user_data});
        dispatch({type: types.UPDATE_PRODUCT_FAVORITE, favorite: data.product_favorite});
    }).catch(error => {
        //dispatch(signupUserFail(error.err));      
    });
  };
}

