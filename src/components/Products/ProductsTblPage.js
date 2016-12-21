import Griddle from 'griddle-react';

import { Link} from 'react-router';
import React from 'react';
import axios from 'axios';
import {isvalidRoute} from '../../Data/RouteData';
import { Metadata } from "../../Data/ProductTblSettings";

class ProductsTblPage extends React.Component{
		render() {
			if ( !this.props.productType || !Metadata[this.props.productType]){
				return (<div/>);
			}else{
				let col = [];
				let colMetadata = Metadata[this.props.productType];
				for (let item of colMetadata) {
					if (item.visible)
						col.push(item.columnName);
				}
				return (
						<Griddle results={this.props.products} tableClassName="table" columnMetadata={colMetadata} showFilter showSettings
							columns={col}
							sortAscendingComponent={<span className="fa fa-sort-amount-asc" />}
							sortDescendingComponent={<span className="fa fa-sort-amount-desc" />}
							sortDefaultComponent={<span className="fa fa-sort " />}
							useGriddleStyles={false}
							ref="Griddle"
							/>
				);
			}
		}

}
ProductsTblPage.propTypes = {
	productType: React.PropTypes.string,
	products: React.PropTypes.array
};

export {ProductsTblPage};
