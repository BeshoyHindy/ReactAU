import { connect } from 'react-redux';
import React from 'react';

import connectDataFetchers from '../../lib/connectDataFetchers.jsx';
import { Breadcrumb , BigHeader, OrangeBoard} from "../Shared/Shared";
import { loadCategories } from '../../actions/adminActions';
import DetailApi from '../../api/DetailsApi';

let colDetail = [
	{	desc: "Image File",		db:"imageUrl",		type: 3	}, 
	{	desc: "Product Name",	db:"name",		type: 1	}, 
	{	desc: "Brand",			db:"brand",		type: 1	},
	{	desc: "Type",			db:"type",		type: 1	},
	{	desc: "Channel",		db:"channel",		type: 4	}, 
	{	desc: "Remote",			db:"remote",		type: 1	},
	{	desc: "Backup",			db:"backup",		type: 1	},
	{	desc: "HDD",			db:"HDD",		type: 1	},
	{	desc: "Video Output",	db:"videoout",		type: 1	},
	{	desc: "Compression",	db:"compression",		type: 1	},
	{	desc: "Sensor",			db:"sensor",		type: 1	},
	{	desc: "Resolution",		db:"resolution",		type: 1	},
	{	desc: "Lens",			db:"lens",		type: 1	},
	{	desc: "Feature",		db:"feature",		type: 1	},
	{	desc: "Description",	db:"desc",		type: 2	}, 
	{	desc: "PoE port",		db:"PoEport",		type: 4	}, 
	{	desc: "IR",				db:"ir",		type: 1	},
	{	desc: "Input/Output",	db:"io",		type: 1	}  
];


class AdminEditProductPage extends React.Component{
	constructor(props) {
		super(props);
		this.state = { 
			cat:1 ,
			imageUrl: "",
			name: "",
			brand: "",
			type: "",
			channel: "",
			remote: "",
			backup: "",
			HDD: "",
			videoout: "",
			compression: "",
			sensor: "",
			resolution: "",
			lens: "",
			feature: "",
			desc: "",
			PoEport: "",
			ir: "",
			io: ""
		}
		this.setCategory = this.setCategory.bind(this);
		this.submit = this.submit.bind(this);
		this.setInput = this.setInput.bind(this);
		this.getFormInput = this.getFormInput.bind(this);		
	}
	setInput (e){
		let props = {};
		props[e.target.name] = e.target.value.trim() || "";
		this.setState(props);
	}
	setImage (e){
		let file = e.target.files[0];
		let reader = new FileReader();
		reader.onload = function (){
			this.setState({
				image: reader.result
			});
		}.bind(this);
		reader.readAsDataURL(file);

	}
	setCategory (e){
		let props = {cat: parseInt(e.target.value)};
		this.setState(props);
	}	
	submit (e){
		e.preventDefault();
		if (!this.state.name || !this.state.name.trim() || this.state.name.trim() === ""){
			alert("Please key in product name...");
			return;
		}

		this.setState({id: this.state.name.toLowerCase().trim()});
		alert(JSON.stringify(this.state, null, '  '));
		// return DetailApi.setProductDetails(this.state).then(details => {
			
		// }).catch(error => {
		// 	throw(error);
		// });
	}
	getFormInput(id ){
		switch(colDetail[id].type){
			case 1: //text
				return (<input type="text" name={colDetail[id].db} className="form-control" id={colDetail[id].db} 
								placeholder={"Please Key In " + colDetail[id].desc} 
								value={this.state[colDetail[id].db]}  onChange={this.setInput}
						/>);
			case 2: //textarea
				return (<textarea name={colDetail[id].db} className="form-control" id={colDetail[id].db} 
								placeholder={"Please Key In " + colDetail[id].desc} 
								value={this.state[colDetail[id].db]}  onChange={this.setInput} rows="3"
						/>);
			case 3: //file
				return (<input type="file" name={colDetail[id].db} className="form-control" id={colDetail[id].db} 
								placeholder={"Please Key In " + colDetail[id].desc} 
								value={this.state[colDetail[id].db]}  onChange={this.setInput}
						/>);
			case 4: //number
				return (<input type="number" name={colDetail[id].db} className="form-control" id={colDetail[id].db} 
								placeholder={"Please Key In " + colDetail[id].desc} 
								value={this.state[colDetail[id].db]}  onChange={this.setInput}
						/>);
			default: //text
				return (<input type="text" name={colDetail[id].db} className="form-control" id={colDetail[id].db} 
								placeholder={"Please Key In " + colDetail[id].desc} 
								value={this.state[colDetail[id].db]}  onChange={this.setInput}
						/>);
		}		
	}
	render () {		
		let {categories} = this.props;
		let cat = categories.filter((item) => {return item._id===this.state.cat;})[0];		
		return (
		<form>
			<div className="container">
				<div className="row">
					<div className="col-lg-12">
						<Breadcrumb linkPair={[{link:"Home", desc:"Home"},{link:"", desc:"Administration"}]}/>
						<BigHeader smallTitle="">Add Products</BigHeader>
					</div>
					<div className="col-xs-12">
						<div className="form-group">
							<label htmlFor="productCategory">Product Category</label>
							<select className="form-control" id="productCategory" value={this.state.cat} onChange={this.setCategory}>
								{
									categories.map( function(item, id){
									return (<option key={id} value={item._id}> {item.categoryName}</option>);
									})
								}
							</select>
						</div>						
						{
							cat.props.map((item,id)=>{ 
								return 	item? (
												<div className="form-group"  key={id}>
													<label htmlFor={colDetail[id].db}>{colDetail[id].desc}</label>
													{
														this.getFormInput(id)
													}
												</div>
											)
											:"";
								}
							)
						}					
							<button className="btn btn-danger" onClick={this.submit}>Add</button>
					</div>
				</div>
			</div>
		</form>
		);
	}
}


AdminEditProductPage.propTypes = {
	categories: React.PropTypes.array,
	ajaxState: React.PropTypes.number
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
