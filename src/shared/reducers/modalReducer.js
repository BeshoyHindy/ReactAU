import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function modalReducer(state = initialState.modal, action) {
  if (action.type == types.CHANGE_MODAL_OPEN) {
    return Object.assign({},state, {showModal: action.modal});
  } 
  if (action.type == types.CHANGE_XSNAV_OPEN) {
    return Object.assign({},state, {showXsNav: action.modal});
  } 
  return state;
}

