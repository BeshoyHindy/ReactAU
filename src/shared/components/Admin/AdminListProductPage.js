import { connect } from 'react-redux';
import React from 'react';

import connectDataFetchers from '../../lib/connectDataFetchers.jsx';
import { Breadcrumb , BigHeader, OrangeBoard} from "../Shared/Shared";
import { loadProductList } from '../../actions/productsActions';
import ProductsTblPage from '../Products/ProductsTblPage';

class AdminListProductPage extends React.Component{
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
		this.context.router.history.push(`/admin/productList/${productType}`);
	}
	render () {
		let {match, categories, products, ajaxState} = this.props;
		let cat = 1, t = categories.filter((item) => {return item.categoryName===match.params.cat ;});
		if (t && t[0])
			cat = t[0]._id || 1 ;

	return (
		<form>
			<div className="row">
				<div className="col-lg-12">
					<Breadcrumb linkPair={[{link:"/home", desc:"Home"},{link:"/admin/productChange/0", desc:"Administration"},{link:"", desc:"Edit Products"}]}/>
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
					<ProductsTblPage productType={match.params.cat} match={match} ajaxState={ajaxState} products={products} 
							edit={true} editBaseLink="/admin/productChange/" delete={true} />
				</div>
			</div>
		</form>
		
		);
	}
}


AdminListProductPage.propTypes = {
	categories: React.PropTypes.array,
	ajaxState: React.PropTypes.number,
	products:  React.PropTypes.array,
	match: React.PropTypes.object.isRequired,		
};
AdminListProductPage.contextTypes = {
	router: React.PropTypes.object
};

function mapStateToProps(state, ownProps) {
// console.log("AdminListProductPage - mapStateToProps", state);
  return {
   products: state.products,
    categories: state.categories,
	ajaxState: state.ajaxCallsInProgress,
  };
}

const AdminListProductPageWrap = connect(mapStateToProps)(
    connectDataFetchers(AdminListProductPage, [ loadProductList ])
);

export default AdminListProductPageWrap;
