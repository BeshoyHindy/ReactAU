if (process.env.BROWSER) {
	require ('./product.scss');
}


import { connect } from 'react-redux';
import { Route, Link} from 'react-router-dom';
import React from 'react';
import connectDataFetchers from '../lib/connectDataFetchers.jsx';
import { getDevice } from '../actions/deviceAction';
import { ProductIndex } from './Products/ProductIndex';
import { Breadcrumb} from "./Shared/Shared";
import {isvalidRoute} from '../Data/RouteData';
import { Metadata } from "../Data/ProductTblSettings";
import { loadCategories } from '../actions/adminActions';
import { loadProducts } from '../actions/productsActions';


import ProductCategorySidebar from './Products/Sidebar/ProductCategorySidebar';
import ProductIndexSidebar from './Products/Sidebar/ProductIndexSidebar';
import ProductCategory from './Products/ProductCategory';
import ProductsTblPage from './Products/ProductsTblPage';


let ProductsPage = class ProductsPage extends React.Component{
		constructor(props) {
			super(props);
			this.getProductContent = this.getProductContent.bind(this);
			this.getProductSidebar = this.getProductSidebar.bind(this);
		}
		getProductContent() {
			let {match, products, ajaxState} = this.props ;
			let ProductsTbl = match.params.ProductsTbl;
			let filtered = products;
			if (ProductsTbl && ProductsTbl !== "All"){
				filtered = products.filter( item => {
					return item.type == ProductsTbl
						|| item.brand == ProductsTbl;
				});
			}
			return (<ProductsTblPage products={filtered} productType={match.params.product} ajaxState={ajaxState}
							params={match.params}/>);

		}
		getProductSidebar() {
			let {match, products} = this.props ;
			return (<ProductCategorySidebar products={products} productType={match.params.product} ProductsTbl={match.params.ProductsTbl} params={match.params}/>);
		}
		render() {
			let {match} = this.props ;
			let linkpair = [
							{link:"/home", desc:"Home"},
							{link:"/products", desc:"Products"}
						];
			match.params.product && linkpair.push({link:"/products/" + match.params.product + "/All", desc:match.params.product}	);
			match.params.ProductsTbl && linkpair.push({link:"", desc:match.params.ProductsTbl});

			return (
			<div className="container">
				<div className="row">
					<div className="col-lg-12">
						<Breadcrumb linkPair={linkpair}/>
					</div>
					<div className="col-md-3 col-lg-2 hidden-sm hidden-xs sidebar">
						{ this.getProductSidebar() }						
					</div>

					<div className="col-md-9 col-lg-10 roghtcontent">
						{this.getProductContent()}
					</div>
				</div>
			</div>
			);
		}
}
ProductsPage.propTypes = {
	content: React.PropTypes.node,
	sidebar: React.PropTypes.node,
	match:  React.PropTypes.object,
	products:  React.PropTypes.array,
	ajaxState:  React.PropTypes.number,
};

function mapStateToProps(state, ownProps) {
  return {
    products: state.products,
	ajaxState: state.ajaxCallsInProgress
  };
}

ProductsPage = connect(mapStateToProps)(
    connectDataFetchers(ProductsPage, [ loadProducts, getDevice, loadCategories ])
);

export default  ProductsPage ;
