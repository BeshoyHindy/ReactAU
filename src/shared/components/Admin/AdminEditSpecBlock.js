import React from 'react';
import { isEmptyObject } from "../Shared/Shared";
import update from 'immutability-helper';

class AdminEditSpecBlock extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			group: props.group,
			newItem :{
				name:"",
				details: ""
			}
		};
		this.setInput = this.setInput.bind(this);
		this.addItem = this.addItem.bind(this);
		this.deleteItem = this.deleteItem.bind(this);		
		this.deleteGroup = this.deleteGroup.bind(this);		
		// console.log("AdminEditSpecBlock, constructors", this.state);
	}
	componentWillReceiveProps(nextProps) {
		if (this.props != nextProps){
			let {group} = nextProps;
			this.setState({group: isEmptyObject(group)?[]:group});
			// console.log("AdminEditSpecBlock, componentWillReceiveProps", !isEmptyObject(group)?group:[]);
		}		
	}
	setInput (e){
		let subId = parseInt(e.target.getAttribute("data-subId"));
		let subField = e.target.getAttribute("data-subField");
		let value = e.target.value.trim() || "";
		const newGroup  = update(this.state.group, {
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
		const newGroup  = update(this.state.group, {
			members: {$splice: [[subId, 1]]}}
		);			
		this.props.setGroup( this.props.gid, newGroup);
	}
	addItem(e){
		const newGroup  = update(this.state.group, {
			members: {$push: [this.state.newItem]}}
		);
		this.props.setGroup( this.props.gid, newGroup);
	}
	deleteGroup(e){
		this.props.deleteGroup( this.props.gid);
	}		
	render () {				
		let {group, gid} = this.props;
		return (
			<tbody>
				<tr>
				<td colSpan="2">{group.name}</td>
				<td className="td-delete-item"><i className="fa fa-close icon-item delete-item delete-item-left" data-id={gid} onClick={this.deleteGroup}/>	</td>
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

