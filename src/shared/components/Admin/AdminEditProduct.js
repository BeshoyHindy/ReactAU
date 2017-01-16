import { connect } from 'react-redux';
import React from 'react';

import connectDataFetchers from '../../lib/connectDataFetchers.jsx';
import { Breadcrumb , BigHeader, OrangeBoard} from "../Shared/Shared";
import { loadCategories } from '../../actions/adminActions';
import { loadDetails } from '../../actions/detailsActions';
import { loadProductList } from '../../actions/productsActions';

import DetailApi from '../../api/DetailsApi';
import {productEditColDetail} from '../../Data/General';

let initialStateDB = {cat : 1};
for(let item of productEditColDetail){
	initialStateDB[item.db] = "";
}

class AdminEditProductPage extends React.Component{
	constructor(props) {
		super(props);
		this.state = (props.params.id == 0) ? initialStateDB: props.details;
		this.setCategory = this.setCategory.bind(this);
		this.submit = this.submit.bind(this);
		this.setInput = this.setInput.bind(this);
		this.getFormInput = this.getFormInput.bind(this);
	}
	componentWillReceiveProps(nextProps) {
		if (this.props != nextProps){
			this.setState((nextProps.params.id == 0) ? initialStateDB: nextProps.details);
		}
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

		let details = Object.assign({}, this.state);

		for(let i in details) {
			if ( details[i] == "" || details[i] === null || details[i] === {} || details[i] === [] ) {
			delete details[i];
			}
		}

		DetailApi.setProductDetails(details)
		.then(details => {
			let cat = this.props.categories.filter((item) => {return item._id===this.state.cat;})[0];
			this.props.dispatch(loadProductList({cat: cat.categoryName || "DVR", subType:"All"}));
			alert("success!!");
			this.props.router.push(`/admin/productList/${cat.categoryName}`);
		}).catch(error => {
			throw(error);
		});
		// this.setState(initialStateDB);
	}
	getFormInput(id ){
		let details = this.state;
		let item = productEditColDetail[id];
		let inputValue = (!details || details === {} || !details[item.db])? "" : details[item.db];
		let inputId = item.db;
		let inputDesc = item.desc;
		let opts = {};
        if (inputId === "id" && this.props.params.id != 0 ) {
            opts['disabled'] = 'disabled';
        }
		opts['id'] = inputId;
		opts['name'] = inputId;
		opts['placeholder'] = `Please Key In ${inputDesc}`;
		opts['value'] = inputValue;
		opts['onChange'] = this.setInput;
		opts['className'] = "form-control";
		switch(item.type){
			case 1: //text
				return (<input type="text" value={inputValue}  {...opts}/>);
			case 2: //textarea
				return (<textarea value={inputValue} rows="3" {...opts} />);
			case 3: //file
				return (<input type="file" value="" {...opts}/>);
			case 4: //number
				return (<input type="number" value={inputValue} {...opts}/>);
			default: //text
				return (<input type="text" value={inputValue} {...opts}/>);
		}
	}
	render () {
		let {categories, details} = this.props;
		if (this.props.ajaxState > 0 || !categories || categories.length ===0) {
			return (<div className="ajax-loading"><img src="/img/ajax-loader.gif" alt=""/></div>);
		}

		let cat = categories.filter((item) => {return item._id===this.state.cat;})[0];
		return (
		<form>
			<div className="container">
				<div className="row">
					<div className="col-lg-12">
						<Breadcrumb linkPair={[{link:"Home", desc:"Home"},{link:"", desc:"Administration"}]}/>
						<BigHeader smallTitle="">{this.props.params.id ?"Edit":"Add"} Products</BigHeader>
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
													<label htmlFor={productEditColDetail[id].db}>{productEditColDetail[id].desc}</label>
													{
														this.getFormInput(id)
													}
												</div>
											)
											:"";
								}
							)
						}
							<button className="btn btn-danger" onClick={this.submit}>Apply</button>
					</div>
				</div>
			</div>
		</form>
		);
	}
}


AdminEditProductPage.propTypes = {
	categories: React.PropTypes.array,
	ajaxState: React.PropTypes.number,
	details: React.PropTypes.object,
};

function mapStateToProps(state, ownProps) {
  return {
    categories: state.categories,
	details: state.details,
	ajaxState: state.ajaxCallsInProgress
  };
}

const AdminEditProductPageWrap = connect(mapStateToProps)(
    connectDataFetchers(AdminEditProductPage, [ loadCategories, loadDetails ])
);

export default AdminEditProductPageWrap;
