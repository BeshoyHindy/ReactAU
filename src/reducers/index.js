import { combineReducers } from 'redux';
import products from './productReducer';
import details from './detailReducer';
import ajaxCallsInProgress from './ajaxStatusReducer';

const rootReducer = combineReducers({
  products,
  details,
  ajaxCallsInProgress
});

export default rootReducer;
