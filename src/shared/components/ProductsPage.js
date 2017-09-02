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
			let {match, products, routes, level, Comps, url, categories} = this.props ;
			let linkpair = [
							{link:"/home", desc:"Home"},
							{link:"/products", desc:"Products"}
						];
			let params = {...match.params, product: match.params.product || "DVR", ProductsTbl: match.params.ProductsTbl || "All"};
			linkpair.push({link:"/products/" + params.product + "/All", desc:params.product}	);
			linkpair.push({link:"", desc:params.ProductsTbl});

			return (
			<div className="container">
				<div className="row">
					<div className="col-lg-12">
						<Breadcrumb linkPair={linkpair}/>
					</div>
					<div className="col-md-3 col-lg-2 hidden-sm hidden-xs sidebar">
						<ProductCategorySidebar products={products} productType={params.product } ProductsTbl={params.ProductsTbl} params={params}/>
					</div>

					<div className="col-md-9 col-lg-10 roghtcontent">
						{routes.map(route => (<RouteWithSubRoutes key={route.path + level} route={route} level={level}  Comps={Comps}  url={url}/>))}
					</div>
				</div>
			</div>
			);
		}
}
ProductsPage.propTypes = {
	match:  React.PropTypes.object,
	categories: React.PropTypes.array,
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
	categories: state.categories,
  };
}

ProductsPage = connect(mapStateToProps)(
    connectDataFetchers(ProductsPage)
);

export default  ProductsPage ;
