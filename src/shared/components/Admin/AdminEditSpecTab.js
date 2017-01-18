import React from 'react';

class AdminEditSpecTab extends React.Component{
	constructor(props) {
		super(props);
		this.state = {spec: props.spec};
		this.setInput = this.setInput.bind(this);

	}
	componentWillReceiveProps(nextProps) {
		if (this.props != nextProps){
			this.setState({spec: nextProps.spec});
		}
	}
	setInput (e){
		let id = parseInt(e.target.getAttribute("data-id"));
		let subId = parseInt(e.target.getAttribute("data-subId"));
		let subField = e.target.getAttribute("data-subField");
		let value = e.target.value.trim() || "";
		let data = {id, subId, subField, value};

		this.props.setData(this.props.tabId, data);
		// this.props.actions.setDetailsSpec(data);
	}
	render () {
		return (
		<div className="admin-edit-tabwrap">
			<div id="p-spec">
				<table className="table table-striped table-bordered table-hover p-spec">
				{
					this.state.spec && this.state.spec.map( (item, i) => {
						return (
							<tbody key={i}>
								<tr>
								<td colSpan="2">{item.name}</td>
								</tr>
								{
									item.members.map((v, id) => {
										return (
											<tr  key={id}>
												<td style={{width:"30%"}}>
													<input type="text" value={v.name} onChange={this.setInput} className="form-control"
														name={item.name} data-id={i}  data-subId={id} data-subField="name" />
												</td>
												<td><input type="text" value={v.details} onChange={this.setInput} className="form-control"
														name={item.name} data-id={i}  data-subId={id} data-subField="details" /></td>
											</tr>
										);
									})
								}
							</tbody>
						);
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
};

export default AdminEditSpecTab;
