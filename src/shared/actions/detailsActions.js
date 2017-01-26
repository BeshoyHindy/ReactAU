import DetailApi from '../api/DetailsApi';
import * as types from './actionTypes';
import {beginAjaxCall, ajaxCallError} from './ajaxStatusActions';

function loadDetailsSuccess(details) {
  return {type: types.LOAD_DETAILS_SUCCESS, details};
}

export function loadDetails(detail) {
  return dispatch => {
    dispatch(beginAjaxCall());
    if (!detail.params.id || detail.params.id == 0){
        return new Promise(
          function(resolve, reject) {
            dispatch(loadDetailsSuccess({}));
            resolve({});
          }
      );
    }
    return DetailApi.getAllDetails(detail.params.id).then(details => {
      dispatch(loadDetailsSuccess(details));
    }).catch(error => {
      dispatch(ajaxCallError()); 
      throw(error);
    });
  };
}


