import React from 'react';


class AdminEditInputArray extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			data: [...this.props.data, ""]
		};
		this.changeInputs = this.changeInputs.bind(this);
		this.addInputs = this.addInputs.bind(this);
		this.deleteItem = this.deleteItem.bind(this);
	}
	changeInputs(e){
		let index = parseInt(e.target.name);
		let nData = [...this.state.data];
		nData[index] = e.target.value;
		this.setState( {data: nData });
		this.props.setData(this.props.field, nData);
	}
	addInputs(){
		this.setState( {data: [...this.state.data, ""] });
	}
	deleteItem(e){
		let id = parseInt(e.target.getAttribute("data-id"));
		let nData=[...this.state.data.slice( 0, id) ,...this.state.data.slice( id+1, this.state.data.length)];
		this.setState({data: nData});
		this.props.setData(this.props.field, nData);
	}
	render () {
		return (
		<div>
			<ul className="fa-ul">
				{
					this.state.data.map((item,id)=>{
						return (
							<li key={id} ><input type="text" className="form-control" value={item} name={id} onChange={this.changeInputs}/>
								<i className="fa-li fa fa-close delete-item" data-id={id} onClick={this.deleteItem}/>
							</li>
						);
					})
				}
				<li>
					<input type="button" className="btn btn-warning" value="Add Item" onClick={this.addInputs}/>
				</li>
			</ul>
		</div>
		);
	}
}


export default AdminEditInputArray;
