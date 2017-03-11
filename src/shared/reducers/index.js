import { combineReducers } from 'redux';
import products from './productReducer';
import details from './detailReducer';
import auth from './authReducer';
import modal from './modalReducer';
import ajaxCallsInProgress from './ajaxStatusReducer';
import categories from './categoriesReducer.js';
import { reducer as formReducer } from 'redux-form';
import device from './deviceReducer';

const rootReducer = combineReducers({
  products,
  details,
  ajaxCallsInProgress,
  categories,
  auth,
  modal,
  device,  
  form: formReducer ,
});

export default rootReducer;
