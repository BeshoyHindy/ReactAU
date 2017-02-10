import * as types from './actionTypes';

export function changeModal(modal) {
  return dispatch => {
	if(modal === true){
		dispatch({type: types.CLAEN_MODAL_ERRMESSAGE});
	}
    dispatch({type: types.CHANGE_MODAL_OPEN, modal});
  };
}
export function changeXsNavModal(modal) {
  return dispatch => {
    dispatch({type: types.CHANGE_XSNAV_OPEN, modal});
  };
}

let hodeXsNavAction = {type: types.CHANGE_XSNAV_OPEN, modal: false};

export {hodeXsNavAction};
