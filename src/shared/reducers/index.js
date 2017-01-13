import { combineReducers } from 'redux';
import products from './productReducer';
import details from './detailReducer';
import ajaxCallsInProgress from './ajaxStatusReducer';
import categories from './categoriesReducer.js';
import { routerReducer } from 'react-router-redux';

const rootReducer = combineReducers({
  products,
  details,
  ajaxCallsInProgress,
  categories,
  routing: routerReducer
});

export default rootReducer;
