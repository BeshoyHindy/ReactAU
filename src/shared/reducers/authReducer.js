import * as types from '../actions/actionTypes';
import initialState from './initialState';

import { combineReducers } from 'redux';

function authReducer(state = initialState.auth, action) {
  switch (action.type) {
    case types.SIGN_UP_USER_SUCCESS:
      return {user: action.user, error:"", success:true};
    case types.SIGN_UP_USER_FAIL:
      return {user: {}, error:action.error, success:false};
    case types.USER_CHANGE_PROFILE_SUCCESS:
      return {user: action.user, error:"", success:true};
    case types.USER_CHANGE_PROFILE_FAIL:
      return {user: {}, error:action.error, success:false};
    case types.USER_SIGN_OUT:
      return {user: {}, error:"", success:false};
    case types.UPDATE_USER_DATA:
      return {user: Object.assign({}, state, {data: action.data}), error:"", success:true};
    default:
      return state;
  }
}


export default authReducer;



