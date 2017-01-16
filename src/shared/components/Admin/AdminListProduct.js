import { connect } from 'react-redux';
import React from 'react';

import connectDataFetchers from '../../lib/connectDataFetchers.jsx';
import { Breadcrumb , BigHeader, OrangeBoard} from "../Shared/Shared";
import { loadCategories } from '../../actions/adminActions';
import { loadProductList } from '../../actions/productsActions';
import DetailApi from '../../api/DetailsApi';
import {productEditColDetail} from '../../Data/General';
import ProductsTblPage from '../Products/ProductsTblPage';

class AdminEditProductPage extends React.Component{
	constructor(props) {
		super(props);
		let catindex = 1;
		let {categories, params} = this.props;
		if(params.cat && categories && categories.length > 0){
		 	catindex = categories.filter( item => {return item.categoryName===params.cat})[0]._id;
		}
		this.state = {catId: catindex, productType: params.cat || "DVR"};
		this.setCategory = this.setCategory.bind(this);
	}
	componentDidMount() {
		let product ={cat: this.state.productType || "DVR", subType:"All"};
		this.props.dispatch( loadProductList(product) );
	}
	setCategory (e){
		let cindex = parseInt(e.target.value);
		let props = {cat: cindex};
		let {categories} = this.props;
		this.setState(props);
		this.props.dispatch( loadProductList({cat: this.state.productType, subType:"All"}) );
	}
	render () {
		let {categories} = this.props;

		let ProductList = <div className="ajax-loading"><img src="/img/ajax-loader.gif" alt=""/></div>;
		if (this.props.products  && this.props.products.length > 0){
			ProductList = (<ProductsTblPage productType={this.state.productType}  ajaxState={this.props.ajaxState} products={this.props.products} 
								edit={true} editBaseLink="/admin/productChange/" delete={true} router={this.props.router} />);
		}
		return (
		<form>
			<div className="container">
				<div className="row">
					<div className="col-lg-12">
						<Breadcrumb linkPair={[{link:"Home", desc:"Home"},{link:"", desc:"Administration"}]}/>
						<BigHeader smallTitle="">Edit Products</BigHeader>
					</div>
					<div className="col-xs-12">
						<div className="form-group">
							<label htmlFor="productCategory">Product Category</label>
							<select className="form-control" id="productCategory" value={this.state.catId} onChange={this.setCategory}>
								{
									categories.map( function(item, id){
									return (<option key={id} value={item._id}> {item.categoryName}</option>);
									})
								}
							</select>
						</div>
					</div>
					<div className="col-xs-12">
						{ProductList}
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
	products:  React.PropTypes.array,
};

function mapStateToProps(state, ownProps) {
	//console.log("mapStateToProps", state);
  return {
   products: state.products,
    categories: state.categories,
	ajaxState: state.ajaxCallsInProgress,
  };
}

const AdminListProductPageWrap = connect(mapStateToProps)(
    connectDataFetchers(AdminEditProductPage, [ loadCategories ])
);

export default AdminListProductPageWrap;
