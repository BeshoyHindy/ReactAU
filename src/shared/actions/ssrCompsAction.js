import * as types from './actionTypes';

export function getSsrComponents(detail) {
	console.log("getSsrComponents", detail.ssrComps);
  return dispatch => {
    dispatch({type: types.GET_SSR_COMPNENTS, ssrComps: detail.ssrComps } );
  };
}

