import FileApi from '../api/DetailsApi';
import * as types from './actionTypes';
import {beginAjaxCall, ajaxCallError} from './ajaxStatusActions';

function loadImagesSuccess(details) {
  return {type: types.LOAD_IMAGES_SUCCESS, details};
}

export function uploadImages(id, data) {
  return dispatch => {
    dispatch(beginAjaxCall());
    return FileApi.upLoadImages(id, data).then(details => {
      dispatch(loadImagesSuccess(details));
    }).catch(error => {
      dispatch(ajaxCallError()); 
      throw(error);
    });
  };
}

