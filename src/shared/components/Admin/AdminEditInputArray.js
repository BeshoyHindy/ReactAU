import React from 'react';


class AdminEditInputArray extends React.Component{
	constructor(props) {
		super(props);
		this.state = {data: this.props.data};
		this.changeinputs = this.changeinputs.bind(this);
	}
	changeinputs(e){
		let index = parseInt(e.target.name);
		let nData = [...this.state.data];
		nData[index] = e.target.value;
		this.setState((state, props) => { return { data: nData }});
		this.props.setData(this.props.field, nData);
	}
	render () {
		return (
		<div>
			<ul className="fa-ul">
			{
				this.state.data.map((item,id)=>{
					return (
						<li key={id} >  <i className="fa-li fa fa-check-square"/><input type="text" className="form-control" value={item} name={id} onChange={this.changeinputs}/></li>
					);
				})
			}
			</ul>
		</div>
		);
	}
}


export default AdminEditInputArray;
