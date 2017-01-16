import DetailApi from '../api/DetailsApi';
import * as types from './actionTypes';
import {beginAjaxCall} from './ajaxStatusActions';

function loadDetailsSuccess(details) {
  return {type: types.LOAD_DETAILS_SUCCESS, details};
}

export function loadDetails(detail) {
  return dispatch => {
    if (!detail.params.id || detail.params.id == 0){
        return new Promise(
          function(resolve, reject) {
              resolve({});
          }
      );
    }
    dispatch(beginAjaxCall());
    return DetailApi.getAllDetails(detail.params.id).then(details => {
      dispatch(loadDetailsSuccess(details));
    }).catch(error => {
      throw(error);
    });
  };
}
