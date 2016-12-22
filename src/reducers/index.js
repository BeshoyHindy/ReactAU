import { combineReducers } from 'redux';
import products from './productReducer';
import detail from './detailReducer';
import ajaxCallsInProgress from './ajaxStatusReducer';

const rootReducer = combineReducers({
  products,
  detail,
  ajaxCallsInProgress
});

export default rootReducer;
