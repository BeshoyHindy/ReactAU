import AdminApi from '../api/AdminApi';
import * as types from './actionTypes';
import {beginAjaxCall} from './ajaxStatusActions';

function loadCategoriesSuccess(categories) {
  return {type: types.GET_CATEGORIES_SUCCESS, categories};
}

export function loadCategories() {
  return dispatch => {
    //console.log("action creator loadCategories");
    dispatch(beginAjaxCall());
    return AdminApi.getAllCategories().then(categories => {
      //console.log("loadCategories()", categories)
      dispatch(loadCategoriesSuccess(categories));
    }).catch(error => {
      //console.log(error)
      throw(error);
    });
  };
}
