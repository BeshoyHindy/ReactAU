import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';

import {TblImageLoader} from '../Shared/Shared';
import { SortableTbl }  from '../Shared/SortableTbl';
//import * as detailActions from '../../actions/detailsActions';
import { Metadata } from "../../Data/ProductTblSettings";
import {routeBaseLink} from '../../Data/RouteData';

class BaseProductTblImageComponent extends React.Component
{
	constructor(props) {
		super(props);
		this.loadData = this.loadData.bind(this);
	}
	loadData(){
		//this.props.actions.loadDetails(this.props.rowData.id);
	}
	render() {
		return (	
			<td style={{width: '170px', minWidth: '170px', backgroundColor: '#fff'}} onClick={this.loadData}>
				<Link to={routeBaseLink[this.props.productType] + this.props.rowData.id}>
					<TblImageLoader data={this.props.rowData.imageUrl}/>
				</Link>
			</td>
		);
	}
}

BaseProductTblImageComponent.propTypes = {
	rowData:  React.PropTypes.object,
	productType: React.PropTypes.string.isRequired,
};


const ProductsTblPage = (props) =>{
	if ( !props.productType || !Metadata[props.productType] || props.products === []){
		return (<div/>);
	}else{
		let col = [], tHead =[];
		let colMetadata = Metadata[props.productType];
		for (let item of colMetadata) {
			if (item.visible){
				col.push(item.columnName);
				tHead.push(item.displayName);
			}
		}
		return (
			<SortableTbl tblData={props.products}
				tHead={tHead}
				customTd={[{custd: BaseProductTblImageComponent, keyItem: "imageUrl"}]}
				dKey={col} 
				productType={props.productType}
				actions={props.actions}/>
		);
	}
};

ProductsTblPage.propTypes = {
	productType: React.PropTypes.string,
	products: React.PropTypes.array
};

export default ProductsTblPage;

