import React from 'react';
import { SortableTbl }  from '../Shared/SortableTbl';
import {CustomDel, CustomNumberInputTd, CustomTextInputTd} from "./SortabletblCustomInput";

import update from 'immutability-helper';


class EditSortableTbl extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			newItem :this.props.pass.initItem
		};
		this.setInput = this.setInput.bind(this);
		this.addNewItem = this.addNewItem.bind(this);
		this.deleteItem = this.deleteItem.bind(this);		
		this.setNewItemInput = this.setNewItemInput.bind(this);
	}
	componentWillReceiveProps(nextProps) {
	}
	setInput (e){
		let id = parseInt(e.target.getAttribute("data-id"))-1;
		let field = e.target.name;
		let value = e.target.value.trim() || "";
		const newArray  = update(this.props.member, {
			[id]:{
				[field]:{$set: value}
			}
		});	
		this.props.setArrayMember( this.props.tabId, this.props.field, newArray);
	}
	deleteItem(e){
		let id = parseInt(e.target.getAttribute("data-id"))-1;	
		this.props.delArrayMember( this.props.tabId, this.props.field, id);
	}
	addNewItem(e){
		if(!this.state.newItem){
			alert("Please Key In The Field!!");
			return;
		}
		this.props.addArrayMember( this.props.tabId, this.props.field, this.state.newItem);
		this.setState({newItem :this.props.pass.initItem});
	}
	setNewItemInput (e){
		let field = e.target.name;
		let value = e.target.value.trim() || "";
		const newItem  = update(this.state.newItem, {		
			[field]:{$set: value}
		});	
		this.setState((state, props) => { return { newItem };});
	}		
	render () {
		let { newItem} = this.state;
		let nItem = this.props.pass.newItems;
		let tblData = this.props.member.map((item, id)=>{item.id=id+1; return item;});
		return (	
<div>
	<ul>
		<li>
			<table className="table table-striped table-bordered table-hover p-spec">
				<tbody >
					<tr>
						{nItem.map((item, id)=> {return <td key={id}>{item.desc}</td>;})}						
						<td>Add Item</td>
					</tr>
					<tr>
						{nItem.map((item, id)=> {return <td key={id}><input type={item.inputType} value={newItem[item.field]} name={item.field} onChange={this.setNewItemInput} className="form-control"/></td>;})}	
						<td ><input type="button" className="btn btn-warning" value="Add Item" onClick={this.addNewItem}/></td>
					</tr>
				</tbody>
			</table>
		</li>
		<li>
			<SortableTbl tblData={tblData} 
				customTd={this.props.pass.customTd}
				tHead={this.props.pass.tHead} 
				dKey={this.props.pass.dKey} 
				setInput={this.setInput} delItem={this.deleteItem}/>
		</li>
	</ul>				
</div>
		);		
		// return <WrappedComponent data={this.state.data} {...this.props} />;
	}
  }

export default EditSortableTbl;
