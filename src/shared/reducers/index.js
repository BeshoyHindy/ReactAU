import { combineReducers } from 'redux';
import products from './productReducer';
import details from './detailReducer';
import auth from './authReducer';
import modal from './modalReducer';
import ajaxCallsInProgress from './ajaxStatusReducer';
import categories from './categoriesReducer.js';
import { reducer as formReducer } from 'redux-form';
import device from './deviceReducer';
import { routerReducer } from '../../react-router-redux/es';

const rootReducer = combineReducers({
  products,
  details,
  ajaxCallsInProgress,
  categories,
  auth,
  modal,
  device,  
  form: formReducer ,
  router: routerReducer
});

export default rootReducer;
