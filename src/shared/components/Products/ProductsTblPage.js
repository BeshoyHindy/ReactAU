import React from 'react';
import { Link } from 'react-router';
import cloneDeep from 'lodash.clonedeep';
import {TblImageLoader} from '../Shared/Shared';
import { SortableTbl }  from '../Shared/SortableTbl';
//import * as detailActions from '../../actions/detailsActions';
import { Metadata } from "../../Data/ProductTblSettings";
import {routeBaseLink} from '../../Data/RouteData';
import BaseProductDeleteComponent from "../Admin/AdminEditDelete";

const BaseProductTblImageComponent = (props) =>
{
	return (
		<td style={{width: '170px', minWidth: '170px', backgroundColor: '#fff'}} >
			<Link to={routeBaseLink[props.productType] + props.rowData.id}>
				<TblImageLoader data={props.rowData.imageUrl}/>
			</Link>
		</td>
	);
}

BaseProductTblImageComponent.propTypes = {
	rowData:  React.PropTypes.object,
	productType: React.PropTypes.string.isRequired,
};


const BaseProductEditComponent = (props) =>
{
	return (
		<td >
			<Link to={`${props.rowData.edit}${props.rowData.id}`}>
				<input type="button" className="btn btn-warning" value="Edit"/>
			</Link>
		</td>
	);
}



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

		if(props.edit) {
			tHead.push("Edit");
			col.push("edit");
		}
		if(props.delete) {
			tHead.push("Delete");
			col.push("delete");
		}

		let data = cloneDeep(props.products)
		for (let item of data) {
			if (item.images && item.images[0]){
				item.imageUrl= item.images[0];
				delete item.images;
			}
			if(props.edit)
				item.edit = props.editBaseLink;
			if(props.delete)
				item.delete = "";
		}


		// console.log(Metadata[props.productType]);
		return (
			<div className="loading-wrap">
				<div className={`ajax-loading-big ${props.ajaxState > 0?'fade-show':'fade-hide'}`} ><img src="/img/ajax-loader.gif" alt=""/></div>
				<SortableTbl tblData={data}
					tHead={tHead}
					customTd={[
								{custd: BaseProductTblImageComponent, keyItem: "imageUrl"},
								{custd: BaseProductEditComponent, keyItem: "edit"},
								{custd: BaseProductDeleteComponent, keyItem: "delete"}
								]}
					dKey={col}
					productType={props.productType}
					actions={props.actions}
					router={props.router}
					params={props.params}/>
			</div>
		);
	}
};

ProductsTblPage.propTypes = {
	productType: React.PropTypes.string,
	products: React.PropTypes.array,
	ajaxState: React.PropTypes.number
};

export default ProductsTblPage;

