import * as types from '../actions/actionTypes';
import initialState from './initialState';


export default function ssrCompsReducer(state = initialState.ssrComps, action) {
  if (action.type == types.GET_SSR_COMPNENTS) {
	console.log("ssrCompsReducer", action.ssrComps);
    return action.ssrComps || state;
  } 
  return state;
}
