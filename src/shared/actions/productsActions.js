import * as types from './actionTypes';
import ProductApi from '../api/ProductsApi';
import {beginAjaxCall, ajaxCallError} from './ajaxStatusActions';

const loadProductsSuccess = (products) => ({ type: types.LOAD_PRODUCTS_SUCCESS, products });

export function loadProducts(detail) {  
  return function(dispatch) {
    dispatch(beginAjaxCall());    
    return ProductApi.getAllProducts(detail.params.product, detail.params.ProductsTbl)
      .then(products => {
        //console.log('loadProducts success', products);
        dispatch(loadProductsSuccess(products));
      })
      .catch(error => {
        throw(error);
      });
  };
}

export function loadProductList(product) {  
  console.log(product);
  return function(dispatch) {
    dispatch(beginAjaxCall());    
    return ProductApi.getAllProducts(product.cat, product.subType)
      .then(products => {
        //console.log('loadProducts success', products);
        dispatch(loadProductsSuccess(products));
      })
      .catch(error => {
        throw(error);
      });
  };
}

