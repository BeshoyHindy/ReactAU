import * as types from './actionTypes';
import ProductApi from '../api/ProductsApi';
import {beginAjaxCall, ajaxCallError} from './ajaxStatusActions';

const loadProductsSuccess = (products) => ({ type: types.LOAD_PRODUCTS_SUCCESS, products });

export function loadProducts(detail) {  
  return function(dispatch) {
	dispatch(beginAjaxCall());    
	// console.log(detail.params.product, detail.params.ProductsTbl);
    return ProductApi.getAllProducts(detail.params.product || 'DVR', detail.params.ProductsTbl || 'All')
      .then(products => {
        dispatch(loadProductsSuccess(products));
      })
      .catch(error => {
        dispatch(ajaxCallError()); 
        throw(error);
      });
  };
}

export function loadProductList(product) {  
  return function(dispatch) {
    dispatch(beginAjaxCall());    
    return ProductApi.getAllProducts(product.params.cat, 'All')
      .then(products => {
        dispatch(loadProductsSuccess(products));
      })
      .catch(error => {
        dispatch(ajaxCallError()); 
        throw(error);
      });
  };
}

