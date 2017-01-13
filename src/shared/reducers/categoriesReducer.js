import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function productsReducer(state = initialState.categories, action) {
  switch (action.type) {
    case types.GET_CATEGORIES_SUCCESS:
      // console.log("productsReducer()", action.categories)
      return action.categories;
    default:
      return state;
  }
}
