import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function productTypeReducer(state = initialState.productType, action) {
  switch (action.type) {
    case types.LOAD_PRODUCT_TYPE_SUCCESS:
      return action.productType;
    default:
      return state;
  }
}
