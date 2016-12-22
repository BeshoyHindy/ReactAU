import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function detailsReducer(state = initialState.Details, action) {
  switch (action.type) {
    case types.LOAD_DETAILS_SUCCESS:
      return action.Details;
    default:
      return state;
  }
}
