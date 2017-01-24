import React from 'react';

import EditSortableTbl  from './EditSortableTbl';
import {CustomDel, CustomNumberInputTd, CustomTextInputTd} from "./SortabletblCustomInput.js";

import update from 'immutability-helper';

let initItem = {
				desc:""
			};
let customTd=[{custd: CustomTextInputTd, keyItem: "desc"},{custd: CustomDel, keyItem: "del"}];
let tHead=["ID","Description","Delete"];
let dKey=["id","desc","del"];
let newItems =[
	{desc: "Description", inputType:"text", field:"desc"}
]

let pass = {initItem, customTd, tHead, dKey, newItems};

class AdminEditOptTab extends React.Component{
	constructor(props) {
		super(props);
	}	
	render () {
		return (	
			<EditSortableTbl pass={pass} {...this.props}/>
		);
	}
}

AdminEditOptTab.propTypes = {
	member: React.PropTypes.array,
};

export default AdminEditOptTab;
