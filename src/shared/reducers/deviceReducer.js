import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function deviceReducer(state = initialState.device, action) {
  if (action.type == types.GET_DEVICE_INFO) {
    return action.device || state;
  } 
  return state;
}

