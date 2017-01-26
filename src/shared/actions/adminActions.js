import AdminApi from '../api/AdminApi';
import ProductApi from '../api/ProductsApi';

import * as types from './actionTypes';
import {beginAjaxCall, ajaxCallError} from './ajaxStatusActions';

function loadCategoriesSuccess(categories) {
  return {type: types.GET_CATEGORIES_SUCCESS, categories};
}

export function loadCategories() {
  return dispatch => {
    dispatch(beginAjaxCall());
    return AdminApi.getAllCategories().then(categories => {
      dispatch(loadCategoriesSuccess(categories));
    }).catch(error => {
      dispatch(ajaxCallError()); 
      throw(error);
    });
  };
}

