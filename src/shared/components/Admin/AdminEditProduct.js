import { connect } from 'react-redux';
import React from 'react';

import connectDataFetchers from '../../lib/connectDataFetchers.jsx';
import { Breadcrumb , BigHeader, OrangeBoard} from "../Shared/Shared";
import { loadCategories } from '../../actions/adminActions';

let col = [
	"Image Url" 
	,"Name" 
	,"Brand" 
	,"Type"  
	,"Channel" 
	,"Remote" 
	,"Backup" 
	,"HDD"  
	,"Video Output" 
	,"Compression"  
	,"Sensor"  
	,"Resolution"  
	,"Lens"  
	,"Feature"  
	,"Description"  
	,"PoE port"  
	,"IR"  
	,"Input/Output"  
];
class AdminEditProductPage extends React.Component{
	constructor(props) {
		super(props);
		this.state = { category:1 };
		this.setCategory = this.setCategory.bind(this);
		this.submit = this.submit.bind(this);
	}
	setName (e){
		this.setState({name:e.target.value});
	}
	setTel (e){
		this.setState({tel:e.target.value});
	}
	setGender (e){
		this.setState({gender: e.target.value});
	}
	setTime (e){
		var key = e.target.value;
		var checked = e.target.checked;
		this.state.time[key] = checked;
		this.forceUpdate();
	}
	setCategory (e){
		this.setState({category: parseInt(e.target.value)});
	}
	setComments (e){
		this.setState({comments:e.target.value});
	}
	setImage (e){
		var file = e.target.files[0];
		var reader = new FileReader();
		reader.onload = function (){
			this.setState({
				image: reader.result
			});
		}.bind(this);
		reader.readAsDataURL(file);

	}
	submit (){
		alert(JSON.stringify(this.state, null, '  '));
	}
	render () {		
		let {categories} = this.props;
		let cat = categories.filter((item) => {return item._id===this.state.category})[0];		
		return (
			<div className="container">
				<div className="row">
					<div className="col-lg-12">
						<Breadcrumb linkPair={[{link:"Home", desc:"Home"},{link:"", desc:"Administration"}]}/>
						<BigHeader smallTitle="">Add Products</BigHeader>
					</div>
					<div className="col-xs-12">
						<div className='form'>
   						<table>
						   <tbody>
							<tr>
								<td>Product Category</td>
								<td>
								<select value={this.state.category} onChange={this.setCategory}>
								{
									categories.map( function(item, id){
									return (<option value={item._id}> {item.categoryName}</option>);
									})
								}
								</select>
								</td>
							</tr>
							{
								cat.props.map((item,id)=>{return item?(<tr key={id}><td>{col[id]}</td><td><input type="text" name={`col_${id}`}/></td></tr>):""})
							}
							</tbody>
							</table>

							<button onClick={this.submit}>Add</button>
						</div>
					</div>
				</div>
			</div>
		);
	}
}


AdminEditProductPage.propTypes = {
};

function mapStateToProps(state, ownProps) {
	//console.log("mapStateToProps", state);
  return {
    categories: state.categories,
	ajaxState: state.ajaxCallsInProgress
  };
}

const AdminEditProductPageWrap = connect(mapStateToProps)(
    connectDataFetchers(AdminEditProductPage, [ loadCategories ])
);

export default AdminEditProductPageWrap;
