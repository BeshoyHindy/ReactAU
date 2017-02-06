import * as types from './actionTypes';

export function changeModal(modal) {
  return dispatch => {
	if(modal.open === true){
		dispatch({type: types.CLAEN_MODAL_ERRMESSAGE});
	}
    dispatch({type: types.CHANGE_MODAL_OPEN, modal});
  };
}
