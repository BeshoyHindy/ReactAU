import { Link} from 'react-router';
import React from 'react';
import axios from 'axios';

import {ProductsTbl} from './ProductsTbl';
import { Details } from './Detail';
import { ProductIndexSidebar, } from './CategorySidebar';
import { Breadcrumb , BigHeader, Paragraph} from "../Shared";



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
		}
		render() {
			let linkpair = [
							{link:"Home", desc:"Home"},
							{link:"/products", desc:"Products"}													
						];
			this.props.params.product && linkpair.push({link:"/products/" + this.props.params.product + "/All", desc:this.props.params.product}	);
			this.props.params.ProductsTbl && linkpair.push({link:"", desc:this.props.params.ProductsTbl});
			return (
				<div className="row">
					<div className="col-lg-12">
						<Breadcrumb linkPair={linkpair}/>
					</div>
					<div className="row">
							<div className="col-md-3 col-lg-2 hidden-sm hidden-xs sidebar">
									{this.props.sidebar || <ProductIndexSidebar />}
							</div>

							<div className="col-md-9 col-lg-10 roghtcontent">
									{this.props.content || <ProductIndex />}
							</div>
					</div>
				</div>
			);
		}
}

const ProductCategory = (props) => (
	<div>
		{ 
			(props.children)
				? (<div> {React.cloneElement(props.children, props)} </div>)
				: (<div></div>)
		}
	</div>
);


export {ProductIndex, ProductCategory, Products};
