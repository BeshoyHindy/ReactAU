import { browserHistory } from 'react-router';
import _map from "lodash/fp/map";
import _flattenDeep from "lodash/fp/flattenDeep";
import _flow from "lodash/fp/flow";
import _filter from "lodash/fp/filter";

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
        // - Save the JWT token
        localStorage.setItem('token', user.token);
        // - redirect to the route '/feature'
        browserHistory.push('/user');
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
        dispatch(signupUserSuccess(user.details));
		dispatch({type: types.CHANGE_MODAL_OPEN, modal:{open:false}}); 
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
        dispatch(signupUserSuccess(user.details));
		dispatch({type: types.CHANGE_MODAL_OPEN, modal:{open:false}}); 
    }).catch(error => {
		// console.log(error);
        dispatch(signupUserFail(error.err));      
    });
  };
}

export function userCheckAuth() {
  return dispatch => {
    dispatch(beginAjaxCall());    
    let token = "";
    if (process.env.BROWSER ){
      token = localStorage.getItem('token');
    }

    return AuthApi.userCheckAuth( token ).then(user => {
		localStorage.setItem('token', user.token);
        dispatch(signupUserSuccess(user.details));
    }).catch(error => {
        dispatch(signupUserFail(error.err));      
        dispatch({type: types.CHANGE_MODAL_OPEN, modal:{open:true}});      
        // browserHistory.push('/signin');
    });
  };
}
export function userReAuth() {
  return dispatch => {
    dispatch(beginAjaxCall());    
    let token = "";
    if (process.env.BROWSER ){
      token = localStorage.getItem('token');
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
    let token = "";
    if (process.env.BROWSER ){
      token = localStorage.getItem('token');
    }

    return AuthApi.userCheckAuth( token ).then(user => {
      if(!user.details || !user.details.accessRight || user.details.accessRight !== 8)
          browserHistory.push('/unauthorized');

		localStorage.setItem('token', user.token);
		dispatch(signupUserSuccess(user.details));
    }).catch(error => {
        dispatch(signupUserFail(error.err));      
        // browserHistory.push('/signin');
		dispatch({type: types.CHANGE_MODAL_OPEN, modal:{open:true}});  
    });
  };
}


export function userSignOut(routes) {
	localStorage.removeItem('token');
	const routeRoles = _flow(
		_filter(item => item.authorize), // access to custom attribute
		_map(item => item.authorize),
		_flattenDeep                 
	)(routes).filter((item) => {return item==="admin" || item==="normal";});		

	if (process.env.BROWSER && routeRoles && routeRoles.length){
		browserHistory.push('/home');
	}   
	return {type: types.USER_SIGN_OUT};
}
