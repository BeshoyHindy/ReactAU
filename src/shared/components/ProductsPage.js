if (process.env.BROWSER) {
	require ('./product.scss');
}


import { connect } from 'react-redux';
import { Link} from 'react-router';
import React from 'react';
import connectDataFetchers from '../lib/connectDataFetchers.jsx';

import { ProductIndexSidebar, } from './Products/Sidebar/CategorySidebar';
import { ProductIndex } from './Products/ProductIndex';
import { Breadcrumb} from "./Shared/Shared";
import {isvalidRoute} from '../Data/RouteData';
import { Metadata } from "../Data/ProductTblSettings";

import { loadProducts } from '../actions/productsActions';

class ProductsP extends React.Component{
		constructor(props) {
			super(props);
			this.getProductContent = this.getProductContent.bind(this);
			this.getProductSidebar = this.getProductSidebar.bind(this);
		}
		getProductContent() {
			if(!this.props.content){
				return <ProductIndex/>;
			}
			let ProductsTbl = this.props.params.ProductsTbl;
			let filtered = this.props.products;
			if (ProductsTbl && ProductsTbl !== "All"){
				filtered = this.props.products.filter( item => {
					return item.type == ProductsTbl
						|| item.brand == ProductsTbl;
				});
			}
			let ProductContentComponentElement
				= React.cloneElement(this.props.content, {products: filtered, productType:this.props.params.product, ajaxState:this.props.ajaxState});
			return ProductContentComponentElement;
		}
		getProductSidebar() {
			if(!this.props.sidebar){
				return <ProductIndexSidebar/>;
			}
			let ProductSidebarComponentElement
				= React.cloneElement(this.props.sidebar, {products: this.props.products, productType:this.props.params.product, ProductsTbl:this.props.params.ProductsTbl});
			return ProductSidebarComponentElement;
		}
		render() {
			let linkpair = [
							{link:"Home", desc:"Home"},
							{link:"/products", desc:"Products"}
						];
			this.props.params.product && linkpair.push({link:"/products/" + this.props.params.product + "/All", desc:this.props.params.product}	);
			this.props.params.ProductsTbl && linkpair.push({link:"", desc:this.props.params.ProductsTbl});

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
ProductsP.propTypes = {
	content: React.PropTypes.node,
	sidebar: React.PropTypes.node,
	params:  React.PropTypes.object,
	products:  React.PropTypes.array,
	ajaxState:  React.PropTypes.number,
};

function mapStateToProps(state, ownProps) {
  return {
    products: state.products,
	ajaxState: state.ajaxCallsInProgress
  };
}

const ProductsPage = connect(mapStateToProps)(
    connectDataFetchers(ProductsP, [ loadProducts ])
);

export { ProductsPage };
