import React from 'react';
import update from 'immutability-helper';

let initItem = {
				name:"",
				details: ""
			};

class AdminEditSpecBlock extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			newItem :initItem
		};
		this.setInput = this.setInput.bind(this);
		this.addNewItem = this.addNewItem.bind(this);
		this.deleteItem = this.deleteItem.bind(this);		
		this.deleteGroup = this.deleteGroup.bind(this);		
		this.setNewItemInput = this.setNewItemInput.bind(this);		
		// console.log("AdminEditSpecBlock, constructors", this.state);
	}
	componentWillReceiveProps(nextProps) {
	}
	setInput (e){
		let subId = parseInt(e.target.getAttribute("data-subId"));
		let subField = e.target.getAttribute("data-subField");
		let value = e.target.value.trim() || "";
		const newGroup  = update(this.props.group, {
			members:{
				[subId]:{
					[subField]:{$set: value}
				}
			}
		});	
		this.props.setGroup(this.props.gid, newGroup);
		// this.props.actions.setDetailsSpec(data);
	}
	deleteItem(e){
		let subId = parseInt(e.target.getAttribute("data-subId"));
		const newGroup  = update(this.props.group, {
			members: {$splice: [[subId, 1]]}}
		);			
		this.props.setGroup( this.props.gid, newGroup);
	}
	deleteGroup(e){
		this.props.deleteGroup( this.props.gid);
	}
	addNewItem(e){
		if(!this.state.newItem.name){
			alert("Please Key In The Field Name!!");
			return;
		}
		const newGroup  = update(this.props.group, {
			members: {$push: [this.state.newItem]}}
		);
		this.props.setGroup( this.props.gid, newGroup);
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
		let {group, gid} = this.props;
		let {newItem} = this.state;
		return (
			<tbody>
				<tr>
				<td colSpan="2">{group.name}</td>
				<td className="td-delete-item"><i className="fa fa-close icon-item delete-item delete-item-left" data-id={gid} onClick={this.deleteGroup}/>	</td>
				</tr>
				<tr >
					<td style={{width:"30%"}}>
						<input type="text" value={newItem.name} onChange={this.setNewItemInput} className="form-control" data-subField="name" />
					</td>
					<td>
						<input type="text" value={newItem.details} onChange={this.setNewItemInput} className="form-control" data-subField="details" />													
					</td>
					<td className="td-delete-item">
						<input type="button" className="btn btn-warning" value="Add Item" onClick={this.addNewItem}/>
					</td>
				</tr>
				{
					group.members.map((v, id) => {
						return (
							<tr  key={id}>
								<td style={{width:"30%"}}>
									<input type="text" value={v.name} onChange={this.setInput} className="form-control"
										name={group.name} data-id={gid}  data-subId={id} data-subField="name" />
								</td>
								<td>
									<input type="text" value={v.details} onChange={this.setInput} className="form-control"
										name={group.name} data-id={gid}  data-subId={id} data-subField="details" />													
								</td>
								<td className="td-delete-item">
									<i className="fa fa-close icon-item delete-item delete-item-left" data-id={gid} data-subId={id} onClick={this.deleteItem}/>
								</td>
							</tr>
						);
					})
				}
			</tbody>
		);
	}

}


AdminEditSpecBlock.propTypes = {
	spec: React.PropTypes.array,
};

export default AdminEditSpecBlock;

