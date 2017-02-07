import React from 'react';
import AdminEditSpecBlock from "./AdminEditSpecBlock";
import update from 'immutability-helper';

let initItem = {
				name:"",
				details: ""
			};
let initGroup = {
					name:"",
					members:[]
				};

class AdminEditSpecTab extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			newGroup: initGroup,
			newItem :initItem
		};
		this.setGroup = this.setGroup.bind(this);
		this.addGroup = this.addGroup.bind(this);
		this.deleteGroup = this.deleteGroup.bind(this);
		this.setNewGrpInput = this.setNewGrpInput.bind(this);
		this.setNewGrpName = this.setNewGrpName.bind(this);
		this.addNewGroupItem = this.addNewGroupItem.bind(this);
		this.setNewItemInput = this.setNewItemInput.bind(this);
		// console.log("AdminEditSpecTab, constructors", this.state);
	}
	componentWillReceiveProps(nextProps) {
	}
	addGroup(e){
		if(!this.state.newGroup.name){
			alert("Please Key In The Name of Group Name!!");
			return;
		}
		this.props.addArrayMember(this.props.tabId, this.props.field, this.state.newGroup);	
		this.setState({
			newGroup: initGroup,
			newItem :initItem
		});
	}
	deleteGroup(gid ){
		const newSpec  = update(this.props.spec, {
			$splice: [[gid, 1]]}
		);			
		this.props.setArrayMember(this.props.tabId, this.props.field, newSpec);
	}
	setGroup (gid , data ){
		const newSpec  = update(this.props.spec, {
			[gid]:{$set: data}
		});	
		this.props.setArrayMember(this.props.tabId, this.props.field, newSpec);
	}
	setNewGrpInput(e){
		let subId = parseInt(e.target.getAttribute("data-subId"));
		let subField = e.target.getAttribute("data-subField");
		let value = e.target.value.trim() || "";
		const newGroup  = update(this.state.newGroup, {
			members:{
				[subId]:{
					[subField]:{$set: value}
				}
			}
		});	
		this.setState((state, props) => { return { newGroup};});			
	}
	setNewGrpName(e){
		let value = e.target.value.trim() || "";
		const newGroup  = update(this.state.newGroup, {
			name:{$set: value}
			}
		);			
		this.setState((state, props) => { return { newGroup};});	
	}
	addNewGroupItem(e){
		if(!this.state.newItem.name){
			alert("Please Key In The Field Name!!");
			return;
		}		
		const newGroup  = update(this.state.newGroup, {
			members: {$push: [this.state.newItem]}}
		);
		this.setState((state, props) => { return { newGroup, newItem :initItem};});
	}
	setNewItemInput (e){
		let subField = e.target.getAttribute("data-subField");
		let value = e.target.value.trim() || "";
		const newItem  = update(this.state.newItem, {		
			[subField]:{$set: value}
		});	
		this.setState((state, props) => { return { newItem };});
	}	
	render () {
		let { newGroup, newItem} = this.state;
		let { spec} = this.props;
		return (
		<div className="admin-edit-tabwrap">
			<div id="p-spec">
				<table className="table table-striped table-bordered table-hover p-spec">
					<tbody >
						<tr>
							<td colSpan="2">{<input type="text" value={newGroup.name} onChange={this.setNewGrpName} className="form-control"/>}</td>
							<td ><input type="button" className="btn btn-warning" value="Add Group" onClick={this.addGroup}/></td>
						</tr>
						<tr >
							<td style={{width:"30%"}}>
								<input type="text" value={newItem.name} onChange={this.setNewItemInput} className="form-control" data-subField="name" />
							</td>
							<td>
								<input type="text" value={newItem.details} onChange={this.setNewItemInput} className="form-control" data-subField="details" />													
							</td>
							<td className="td-delete-item">
								<input type="button" className="btn btn-warning" value="Add Item" onClick={this.addNewGroupItem}/>
							</td>
						</tr>							
						{
							newGroup.members.map((v, id) => {						
								return (
									<tr  key={id}>
										<td style={{width:"30%"}}>
											<input type="text" value={v.name} onChange={this.setNewGrpInput} className="form-control" data-subId={id} data-subField="name" />
										</td>
										<td>
											<input type="text" value={v.details} onChange={this.setNewGrpInput} className="form-control" data-subId={id} data-subField="details" />													
										</td>
									</tr>
								);
							})
						}
					</tbody>
					{					
					spec && spec.map( (item, id) => {
						return (<AdminEditSpecBlock key={id} gid={id} group={item} addItem={this.addItem} 
													deleteGroup={this.deleteGroup} 
													setGroup={this.setGroup}/>);
					})
				}
				</table>
			</div>
		</div>
		);
	}
}


AdminEditSpecTab.propTypes = {
	spec: React.PropTypes.array,
	tabId: React.PropTypes.number,
	addArrayMember: React.PropTypes.func.isRequired,
	setArrayMember: React.PropTypes.func.isRequired,	
	field: React.PropTypes.string.isRequired,	
};

export default AdminEditSpecTab;
