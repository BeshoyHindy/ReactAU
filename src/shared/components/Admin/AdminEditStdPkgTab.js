import React from 'react';

import EditSortableTbl  from './EditSortableTbl';
import {CustomDel, CustomNumberInputTd, CustomTextInputTd} from "./SortabletblCustomInput.js";

import update from 'immutability-helper';

let initItem = {
				desc:"",
				qty: ""
			};
let customTd=[{custd: CustomTextInputTd, keyItem: "desc"},{custd: CustomNumberInputTd, keyItem: "qty"},{custd: CustomDel, keyItem: "del"}];
let tHead=["ID","Description","Qty", "Delete"];
let dKey=["id","desc","qty", "del"];
let newItems =[
	{desc: "Description", inputType:"text", field:"desc"},
	{desc: "Qty", inputType:"number", field:"qty"}
];

let pass = {initItem, customTd, tHead, dKey, newItems};

class AdminEditStdPkgTab extends React.Component{
	constructor(props) {
		super(props);
	}	
	render () {
		return (	
			<EditSortableTbl pass={pass} {...this.props}/>
		);
	}
}

AdminEditStdPkgTab.propTypes = {
	member: React.PropTypes.array,
};

export default AdminEditStdPkgTab;
