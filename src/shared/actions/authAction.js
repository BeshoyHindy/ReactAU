import { browserHistory } from 'react-router';

import AuthApi from '../api/AuthApi';
import * as types from './actionTypes';


function signupUserSuccess(user) {
  return {type: types.SIGN_UP_USER_SUCCESS, user};
}
function signupUserFail(error) {
  return {type: types.SIGN_UP_USER_FAIL, error};
}

export function userSignup(user) {
  return dispatch => {
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
    return AuthApi.userSignin(user).then(user => {
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


export function userSignOut() {
   localStorage.removeItem('token');
   browserHistory.push('/home');
   return {type: types.USER_SIGN_OUT};
}