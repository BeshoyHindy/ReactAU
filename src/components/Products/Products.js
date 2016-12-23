
import { ProductIndexSidebar, } from './CategorySidebar';
import { Breadcrumb , BigHeader, Paragraph} from "../Shared/Shared";
import { Link} from 'react-router';
import React from 'react';
import axios from 'axios';
import {isvalidRoute} from '../../Data/RouteData';
import { Metadata } from "../../Data/ProductTblSettings";

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

class Products extends React.Component{
		constructor(props) {
			super(props);
			this.state = {
				products:[],
				productTypes:[]
			};
			this.fetchData = this.fetchData.bind(this);
			this.getProductContent = this.getProductContent.bind(this);
			this.getProductSidebar = this.getProductSidebar.bind(this);

		}

		componentWillMount() {
		}


		componentDidMount() {
			if ( this.props.params.product && Metadata[this.props.params.product]){
				this.fetchData(this.props.params.product, this.props.params.ProductsTbl);
			}
		}

		componentWillReceiveProps (nextProps) {
		}
		componentDidUpdate (prevProps, prevState) {
			let oldId = prevProps.params.product + prevProps.params.ProductsTbl;
			let newId = this.props.params.product + this.props.params.ProductsTbl;
			if (!oldId || newId !== oldId){
				this.fetchData(this.props.params.product, this.props.params.ProductsTbl);
			}
		}
		fetchData(product, ProductsTbl){
			if (!isvalidRoute(product, ProductsTbl))
				return;


			axios({
				method: 'get',
				url: '/json/'+product+'.json',
				dataType: 'JSON'
			})
			.then( (response) => {
				let filtered = response.data;
				if (ProductsTbl && ProductsTbl !== "All"){
					//this.refs.Griddle.setFilter(ProductsTbl);
					filtered = response.data.filter( item => {
						return item.type == ProductsTbl
							|| item.brand == ProductsTbl;
					});
				}
				let pTypes = response.data.map((item) => {return {brand:item.brand, type:item.type};});

				this.setState({
					products: filtered,
					productTypes: pTypes
				});
			})
			.catch(function (error) {
				//console.log(error);
			});
		}
		getProductContent() {
			if(!this.props.content){
				return <ProductIndex/>;
			}
			let ProductContentComponentElement
				= React.cloneElement(this.props.content, {products: this.state.products, productType:this.props.params.product});
			return ProductContentComponentElement;
		}
		getProductSidebar() {
			if(!this.props.sidebar){
				return <ProductIndexSidebar/>;
			}
			let ProductSidebarComponentElement
				= React.cloneElement(this.props.sidebar, {products: this.state.productTypes, productType:this.props.params.product, ProductsTbl:this.props.params.ProductsTbl});
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
Products.propTypes = {
	content: React.PropTypes.node,
	sidebar: React.PropTypes.node,
	params:  React.PropTypes.object
};



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

export {ProductIndex, ProductCategory, Products};
