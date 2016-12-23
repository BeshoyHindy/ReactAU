import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link} from 'react-router';
import React from 'react';
import axios from 'axios';

import { ProductIndexSidebar, } from './Products/Sidebar/CategorySidebar';
import { Breadcrumb , BigHeader, Paragraph} from "./Shared/Shared";
import {isvalidRoute} from '../Data/RouteData';
import { Metadata } from "../Data/ProductTblSettings";
import * as productActions from '../actions/productsActions';

const ProductIndex = () => (
	<div>
		<Paragraph smallTitle="Lorem ipsum dolor sit amet" title="DVR">
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
		</Paragraph>

		<Paragraph smallTitle="Lorem ipsum dolor sit amet" title="Kit">
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
		</Paragraph>

		<Paragraph smallTitle="Lorem ipsum dolor sit amet" title="CCTV Camera">
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
		</Paragraph>

		<Paragraph smallTitle="Lorem ipsum dolor sit amet" title="Instrusion Alarm">
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
		</Paragraph>

		<Paragraph smallTitle="Lorem ipsum dolor sit amet" title="Video Intercom">
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
		</Paragraph>
	</div>
);



const ProductCategory = (props) => (
	<div>
		{
			(props.children)
				? (<div> {React.cloneElement(props.children, props)} </div>)
				: (<div/>)
		}
	</div>
);
ProductCategory.propTypes = {
	children: React.PropTypes.node
};


class ProductsPage extends React.Component{
		constructor(props) {
			super(props);
			this.getProductContent = this.getProductContent.bind(this);
			this.getProductSidebar = this.getProductSidebar.bind(this);
		}
		componentDidMount () {
			this.props.actions.loadProducts(this.props.params.product, this.props.params.ProductsTbl || "All");
		}
		componentDidUpdate (prevProps, prevState) {
			let oldId = prevProps.params.product + prevProps.params.ProductsTbl;
			let newId = this.props.params.product + this.props.params.ProductsTbl;
			if (!oldId || newId !== oldId){
				this.props.actions.loadProducts(this.props.params.product, this.props.params.ProductsTbl || "All");
			}
		}
		getProductContent() {
			if(!this.props.content){
				return <ProductIndex/>;
			}
			let ProductContentComponentElement
				= React.cloneElement(this.props.content, {products: this.props.products, productType:this.props.params.product});
			return ProductContentComponentElement;
		}
		getProductSidebar() {
			if(!this.props.sidebar){
				return <ProductIndexSidebar/>;
			}
			let pTypes = this.props.products && this.props.products.map((item) => {return {brand:item.brand, type:item.type};});

			let ProductSidebarComponentElement
				= React.cloneElement(this.props.sidebar, {products: pTypes, productType:this.props.params.product, ProductsTbl:this.props.params.ProductsTbl});
			return ProductSidebarComponentElement;
		}
		render() {
			let linkpair = [
							{link:"Home", desc:"Home"},
							{link:"/products", desc:"Products"}
						];
			this.props.params.product && linkpair.push({link:"/products/" + this.props.params.product + "/All", desc:this.props.params.product}	);
			this.props.params.ProductsTbl && linkpair.push({link:"", desc:this.props.params.ProductsTbl});
			//this.props.params.id && linkpair.push({link:"", desc:this.props.params.id.toUpperCase()});

			return (
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
			);
		}
}
ProductsPage.propTypes = {
	content: React.PropTypes.node,
	sidebar: React.PropTypes.node,
	params:  React.PropTypes.object,
	products:  React.PropTypes.array,
	actions: React.PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
	let ProductsTbl = ownProps.params.ProductsTbl;
	let filtered = state.products;
	if (ProductsTbl && ProductsTbl !== "All"){
			filtered = state.products.filter( item => {
				return item.type == ProductsTbl
					|| item.brand == ProductsTbl;
			});
		}
  return {
    products: filtered
  };
}

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(productActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductsPage);


export {ProductIndex, ProductCategory, ProductsPage};
