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
		this.setCategory = this.setCategory.bind(this);
	}
	componentDidMount() {
	}
	componentWillReceiveProps(nextProps) {
	}	
	setCategory (e){
		let productType = this.props.categories.filter((item) => {return item._id===parseInt(e.target.value) ;})[0].categoryName;
		this.props.router.push(`/admin/productList/${productType}`);	
	}
	render () {
		let {categories} = this.props;
		let cat = categories.filter((item) => {return item.categoryName===this.props.params.cat ;})[0]._id;

	return (
	<div className="loading-wrap">
		<div className={`ajax-loading-big ${(!this.props.products || this.props.products.length <= 0)?'fade-show':'fade-hide'}`} ><img src="/img/ajax-loader.gif" alt=""/></div>
		<form>
				<div className="row">
					<div className="col-lg-12">
						<Breadcrumb linkPair={[{link:"Home", desc:"Home"},{link:"/admin/productChange/0", desc:"Administration"},{link:"", desc:"Edit Products"}]}/>
						<BigHeader smallTitle="">Edit Products</BigHeader>
					</div>
					<div className="col-xs-12">
						<div className="form-group">
							<label htmlFor="productCategory">Product Category</label>
							<select className="form-control" id="productCategory" value={cat} onChange={this.setCategory}>
								{
									categories.map( function(item, id){
									return (<option key={id} value={item._id}> {item.categoryName}</option>);
									})
								}
							</select>
						</div>
					</div>
					<div className="col-xs-12">
						<ProductsTblPage productType={this.props.params.cat}  ajaxState={this.props.ajaxState} products={this.props.products} 
								edit={true} editBaseLink="/admin/productChange/" delete={true} router={this.props.router} />
					</div>
				</div>
		</form>
	</div>		
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
    connectDataFetchers(AdminEditProductPage, [ loadCategories , loadProductList])
);

export default AdminListProductPageWrap;
