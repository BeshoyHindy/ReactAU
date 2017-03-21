if (process.env.BROWSER) {
	require ('../Sass/product.scss');
}

import { connect } from 'react-redux';
import { Route, Link} from 'react-router-dom';
import React from 'react';
import connectDataFetchers from '../lib/connectDataFetchers.jsx';
import { ProductIndex } from './Products/ProductIndex';
import { Breadcrumb} from "./Shared/Shared";
import {isvalidRoute} from '../Data/RouteData';
import { Metadata } from "../Data/ProductTblSettings";
import { loadProducts } from '../actions/productsActions';
import {RouteWithSubRoutes} from '../route/util';

import ProductCategorySidebar from './Products/Sidebar/ProductCategorySidebar';
import ProductIndexSidebar from './Products/Sidebar/ProductIndexSidebar';
import ProductCategory from './Products/ProductCategory';
import ProductsTblPage from './Products/ProductsTblPage';


let ProductsPage = class ProductsPage extends React.Component{
		constructor(props) {
			super(props);
		}
		render() {
			let {match, products, routes, level, Comps, url} = this.props ;
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
						<ProductCategorySidebar products={products} productType={match.params.product} ProductsTbl={match.params.ProductsTbl} params={match.params}/>
					</div>

					<div className="col-md-9 col-lg-10 roghtcontent">
						{routes.map(route => (<RouteWithSubRoutes key={route.path} route={route} level={level}  Comps={Comps}  url={url}/>))}
					</div>
				</div>
			</div>
			);
		}
}
ProductsPage.propTypes = {
	match:  React.PropTypes.object,
	routes:  React.PropTypes.array,
	Comps:  React.PropTypes.array,
	level:  React.PropTypes.number,
	url: React.PropTypes.string,
	products:  React.PropTypes.array,
	ajaxState:  React.PropTypes.number,
};

function mapStateToProps(state, ownProps) {
  return {
    products: state.products,
  };
}

ProductsPage = connect(mapStateToProps)(
    connectDataFetchers(ProductsPage, [ loadProducts])
);

export default  ProductsPage ;
