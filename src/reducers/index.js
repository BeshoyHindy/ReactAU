import { combineReducers } from 'redux';
import products from './productReducer';
import details from './detailReducer';
import ajaxCallsInProgress from './ajaxStatusReducer';
import { routerReducer } from 'react-router-redux';

const rootReducer = combineReducers({
  products,
  details,
  ajaxCallsInProgress,
  routing: routerReducer
});

export default rootReducer;
