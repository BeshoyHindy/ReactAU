import * as types from '../actions/actionTypes';
import initialState from './initialState';

import { combineReducers } from 'redux';

function detailsReducer(state = initialState.details, action) {
  switch (action.type) {
    case types.LOAD_DETAILS_SUCCESS:
      return action.details;
    case types.UPDATE_STAR_RATE:
      return Object.assign({}, state, {stars: action.stars});
    case types.UPDATE_PRODUCT_FAVORITE:
      return Object.assign({}, state, {favorite: action.favorite});
    default:
      return state;
  }
}


export default detailsReducer;

