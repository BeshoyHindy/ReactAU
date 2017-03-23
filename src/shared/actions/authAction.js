import { browserHistory } from 'react-router';
import { push } from 'react-router-redux';
import AuthApi from '../api/AuthApi';
import * as types from './actionTypes';
import {beginAjaxCall, ajaxCallError} from './ajaxStatusActions';

function signupUserSuccess(user) {
  return {type: types.SIGN_UP_USER_SUCCESS, user};
}
function signupUserFail(error) {
  return {type: types.SIGN_UP_USER_FAIL, error};
}

export function userSignup(user) {
  return dispatch => {
    dispatch(beginAjaxCall());
    return AuthApi.userSignup(user).then(user => {
        dispatch(signupUserSuccess(user.details));
		dispatch(push('/user'));
        localStorage.setItem('token', user.token);
    }).catch(error => {
        dispatch(signupUserFail(error.err));      
    });
  };
}

export function userSignin(user) {
  return dispatch => {
    dispatch(beginAjaxCall());
    return AuthApi.userSignin(user).then(user => {
        localStorage.setItem('token', user.token);
		dispatch({type: types.CHANGE_MODAL_OPEN, modal:false}); 
        dispatch(signupUserSuccess(user.details));
    }).catch(error => {
		// console.log(error);
        dispatch(signupUserFail(error.err));      
    });
  };
}


export function userSocialLoginClient(data) {
  return dispatch => {
    dispatch(beginAjaxCall());
    return AuthApi.userSocialLoginClient(data).then(user => {
        localStorage.setItem('token', user.token);
		dispatch({type: types.CHANGE_MODAL_OPEN, modal:false}); 
        dispatch(signupUserSuccess(user.details));
    }).catch(error => {
		// console.log(error);
		dispatch({type: types.CHANGE_MODAL_OPEN, modal:true});  
        dispatch(signupUserFail(error.err));      
    });
  };
}

export function userCheckAuth() {
  return dispatch => {
    dispatch(beginAjaxCall());    
    let token = null;
    if (process.env.BROWSER ){
      token = localStorage.getItem('token');
    }
	if(!token){
		dispatch(push('/unauthorized'));
		return;
	}
    return AuthApi.userCheckAuth( token ).then(user => {
		localStorage.setItem('token', user.token);
		if(!user.details || user.details.accessRight === undefined){
			dispatch(push('/unauthorized'));
			return;
		}
        dispatch(signupUserSuccess(user.details));
    }).catch(error => {
        dispatch(signupUserFail(error.err));   
		dispatch(push('/signin'));
		dispatch({type: types.CHANGE_MODAL_OPEN, modal:true});   
    });
  };
}
export function userReAuth() {
  return dispatch => {
    dispatch(beginAjaxCall());    
    let token = null;
    if (process.env.BROWSER ){
      token = localStorage.getItem('token');
    }
	if(!token){
		return;
	}
    return AuthApi.userCheckAuth( token ).then(user => {
		localStorage.setItem('token', user.token);
        dispatch(signupUserSuccess(user.details));
    }).catch(error => {
        dispatch(signupUserFail(error.err));
    });
  };
}
export function userCheckAdmin() {
  return dispatch => {
    dispatch(beginAjaxCall());    
    let token = null;
    if (process.env.BROWSER ){
      token = localStorage.getItem('token');
    }
	if(!token){
		dispatch(push('/unauthorized'));
		return;
	}

    return AuthApi.userCheckAuth( token ).then(user => {
		if(!user.details || !user.details.accessRight || user.details.accessRight !== 8){
			dispatch(push('/unauthorized'));
			return;
		}
		dispatch(signupUserSuccess(user.details));
    }).catch(error => {
        dispatch(signupUserFail(error.err));
    });
  };
}


export function userSignOut() {
	return dispatch => {
		localStorage.removeItem('token');
		dispatch(push('/'));
		return dispatch({type: types.USER_SIGN_OUT});
	};
}
