import { Link} from 'react-router';
import React from 'react';
import axios from 'axios';

import {ProductsTbl} from './ProductsTbl';
import { Details } from './Detail';
import { ProductIndexSidebar, } from './CategorySidebar';

const ProductIndex = () => (
	<div>
		<h1 className="page-header">DVR
			<small>Lorem ipsum dolor sit amet</small>
		</h1>
		<p>
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
		</p>

		<h1 className="page-header">Kit
			<small>Lorem ipsum dolor sit amet</small>
		</h1>
		<p>
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
		</p>

		<h1 className="page-header">CCTV Camera
			<small>Lorem ipsum dolor sit amet</small>
		</h1>
		<p>
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
		</p>

		<h1 className="page-header">Instrusion Alarm
			<small>Lorem ipsum dolor sit amet</small>
		</h1>
		<p>
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
		</p>

		<h1 className="page-header">Video Intercom
			<small>Lorem ipsum dolor sit amet</small>
		</h1>
		<p>
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
		</p>
	</div>
);

class Products extends React.Component{
		constructor(props) {
			super(props);
		}
		render() {
			return (
				<div className="row">
					<div className="col-lg-12">
						<ol className="breadcrumb">
							<li><Link to="/home"> Home </Link></li>
							<li ><Link to="/products">Products</Link></li>
							{
								this.props.params.product  && (<li className="active">{this.props.params.product}</li>)
							}
							{
								this.props.params.ProductsTbl  && (<li className="active">{this.props.params.ProductsTbl}</li>)
							}
						</ol>
					</div>
					<div className="row">
							<div className="col-md-3 col-lg-2 hidden-sm hidden-xs sidebar">
									{this.props.sidebar || <ProductIndexSidebar />}
							</div>

							<div className="col-md-9 col-lg-10 roghtcontent">
							{
								this.props.content || <ProductIndex />
							}
							</div>
					</div>
				</div>
			);
		}
}

const ProductCategory = (props) => {
		return (
			<div> {React.cloneElement(props.children, props)} </div>
		)
};


export {ProductIndex, ProductCategory, Products};
