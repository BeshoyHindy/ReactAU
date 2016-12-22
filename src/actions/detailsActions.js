import DetailApi from '../api/mockDetailsApi';
import * as types from './actionTypes';
import {beginAjaxCall} from './ajaxStatusActions';

export function loadDetailsSuccess(details) {
  return {type: types.LOAD_DETAILS_SUCCESS, details};
}

export function loadDetails() {
  return dispatch => {
    dispatch(beginAjaxCall());
    return DetailApi.getAllDetails().then(details => {
      dispatch(loadDetailsSuccess(details));
    }).catch(error => {
      throw(error);
    });
  };
}
