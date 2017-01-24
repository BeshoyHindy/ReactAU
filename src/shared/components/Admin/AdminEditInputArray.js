import React from 'react';

class AdminEditInputArray extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			newData :""
		};
		this.changeNewInputs = this.changeNewInputs.bind(this);
		this.changeInputs = this.changeInputs.bind(this);
		this.addNewData = this.addNewData.bind(this);
		this.deleteItem = this.deleteItem.bind(this);
	}
	componentWillReceiveProps(nextProps) {
	}	
	changeInputs(e){
		let index = parseInt(e.target.name);
		let nData = [...this.props.data];
		nData[index] = e.target.value;
		this.props.setData(this.props.field, nData);
	}
	changeNewInputs(e){
		let newData = e.target.value;
		this.setState( {newData});
	}
	addNewData(){
		this.setState( { newData:""});		
		this.props.addArrayMember(this.props.field, this.state.newData);
	}
	deleteItem(e){
		let id = parseInt(e.target.getAttribute("data-id"));
		this.props.deleteArrayMember(this.props.field, id);
	}
	render () {

		return (
		<div>
			<ul className="fa-ul ul-delete-item">
				<li ><input type="text" className="form-control" value={this.state.newData} onChange={this.changeNewInputs}/>
					<input type="button" className="btn btn-warning add-botton" value="Add" onClick={this.addNewData}/>
				</li>
				{
					this.props.data && this.props.data.map((item,id)=>{
						return (
							<li key={id} ><input type="text" className="form-control" value={item} name={id} onChange={this.changeInputs}/>
								<i className="fa fa-close icon-item delete-item" data-id={id} onClick={this.deleteItem}/>
							</li>
						);
					})
				}
			</ul>
		</div>
		);
	}
}


export default AdminEditInputArray;
