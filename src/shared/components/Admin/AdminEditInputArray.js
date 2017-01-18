import React from 'react';
import { isEmptyObject} from "../Shared/Shared";

class AdminEditInputArray extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			data: [...this.props.data],
			newData :""
		};
		this.changeNewInputs = this.changeNewInputs.bind(this);
		this.changeInputs = this.changeInputs.bind(this);
		this.addNewData = this.addNewData.bind(this);
		this.deleteItem = this.deleteItem.bind(this);
	}
	componentWillReceiveProps(nextProps) {
		if (this.props != nextProps){
			let {data} = nextProps;
			this.setState({data: isEmptyObject(data)?[]:data});
		}		
	}	
	changeInputs(e){
		let index = parseInt(e.target.name);
		let nData = [...this.state.data];
		nData[index] = e.target.value;
		this.setState( {data: nData });
		this.props.setData(this.props.field, nData);
	}
	changeNewInputs(e){
		let newData = e.target.value;
		this.setState( {newData});
	}
	addNewData(){
		this.setState( {data: [...this.state.data, this.state.newData] , newData:""});
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
			<ul className="fa-ul ul-delete-item">
				<li ><input type="text" className="form-control" value={this.state.newData} onChange={this.changeNewInputs}/>
					<input type="button" className="btn btn-warning add-botton" value="Add" onClick={this.addNewData}/>
				</li>
				{
					this.state.data.map((item,id)=>{
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
