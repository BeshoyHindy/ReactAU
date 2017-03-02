import * as types from './actionTypes';

export function getDevice(detail) {
  return dispatch => {
    dispatch({type: types.GET_DEVICE_INFO, device: detail.device } );
  };
}

