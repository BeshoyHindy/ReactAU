import { combineReducers } from 'redux';
import products from './productReducer';
import details from './detailReducer';
import auth from './authReducer';
import modal from './modalReducer';
import productType from './productTypeReducer';
import ajaxCallsInProgress from './ajaxStatusReducer';
import categories from './categoriesReducer.js';
import { reducer as formReducer } from 'redux-form';
import device from './deviceReducer';
import { routerReducer } from 'react-router-redux';

const rootReducer = combineReducers({
  products,
  details,
  ajaxCallsInProgress,
  categories,
  auth,
  modal,
  device,  
  productType,
  form: formReducer ,
  router: routerReducer
});

export default rootReducer;
