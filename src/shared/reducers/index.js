import { combineReducers } from 'redux';
import products from './productReducer';
import details from './detailReducer';
import auth from './authReducer';
import ajaxCallsInProgress from './ajaxStatusReducer';
import categories from './categoriesReducer.js';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';

const rootReducer = combineReducers({
  products,
  details,
  ajaxCallsInProgress,
  categories,
  auth,
  form: formReducer ,
  routing: routerReducer
});

export default rootReducer;
