import React from 'react';
const CustomDel = (props) => (
	<td className="td-delete-item"><i className="fa fa-close icon-item delete-item delete-item-rigth" data-id={props.rowData.id} onClick={props.delItem}/></td>
);
CustomDel.propTypes = {
	data: React.PropTypes.string,
	rowData: React.PropTypes.object,
	delItem: React.PropTypes.func
};


const CustomInput = (props) => (
	<input  className="form-control" type={props.type} value={props.tdData} data-id={props.rowData.id} name={props.field} onChange={props.setInput}/>
);
CustomInput.propTypes = {
	data: React.PropTypes.string,
	field: React.PropTypes.string,
	type: React.PropTypes.string,
	tdData: React.PropTypes.string,
	setInput: React.PropTypes.func,
	rowData: React.PropTypes.object
};

const CustomTextInputTd = (props) => (
	<td ><CustomInput  type="text" {...props}/></td>
);
CustomTextInputTd.propTypes = {
	data: React.PropTypes.string,
	field: React.PropTypes.string,
	rowData: React.PropTypes.object
};

const CustomNumberInputTd = (props) => (
	<td ><CustomInput  type="number" {...props}/></td>
);
CustomNumberInputTd.propTypes = {
	data: React.PropTypes.string,
	field: React.PropTypes.string,
	rowData: React.PropTypes.object
};


export {CustomDel, CustomNumberInputTd, CustomTextInputTd};
