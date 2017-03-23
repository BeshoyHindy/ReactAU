import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import update from 'immutability-helper';
import {productEditColDetail} from '../../Data/General';
import { ImageLoader } from '../Shared/ImageLoader';
import { SortableTbl }  from '../Shared/SortableTbl';
import { routeBaseLink } from '../../Data/RouteData';
import BaseProductDeleteComponent from "../Admin/AdminEditDelete";
import StarsRated from '../Shared/StarsRated';
import  Favorite  from '../Products/Details/Favorite';
import HeartToggle from '../Shared/HeartToggle';

import connectDataFetchers from '../../lib/connectDataFetchers.jsx';
const BaseProductTblImageComponent = (props) =>
{
	return (
		<td style={{width: '170px', minWidth: '170px', backgroundColor: '#fff'}} >
			<Link to={routeBaseLink[props.productType] + props.rowData._id}>
				<ImageLoader src={props.tdData} minHeight="100px"
					alt={`${props.rowData.brand} - ${props.productType} - ${props.rowData.type} - ${props.rowData.name}`}
					title={`${props.rowData.brand} - ${props.productType} - ${props.rowData.type} - ${props.rowData.name}`}
				/>
			</Link>
		</td>
	);
};

BaseProductTblImageComponent.propTypes = {
	tdData:  React.PropTypes.string,
	rowData:  React.PropTypes.object,
	productType: React.PropTypes.string.isRequired,
};


const BaseProductEditComponent = (props) =>
{
	return (
		<td >
			<Link to={`${props.rowData.edit}${props.rowData._id}`}>
				<input type="button" className="btn btn-warning" value="Edit"/>
			</Link>
		</td>
	);
};
BaseProductEditComponent.propTypes = {
	rowData:  React.PropTypes.object,
};


let ProductsTblPage = class ProductsTblPage extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			gridView : !!(props.device.phone || props.device.mobile),
			manualSetGV : false
		};
		this.setGridListView = this.setGridListView.bind(this);
		this.handleResize = this.handleResize.bind(this);
	}
	componentDidMount() {
		window.addEventListener('resize', this.handleResize, false);
	}
	componentWillUnmount() {
		window.removeEventListener('resize', this.handleResize);
	}
	handleResize(){
		let {device} = this.props;
		let gv = window.outerWidth < 736 || (device.phone || device.mobile);
		if (!this.state.manualSetGV && gv !== this.state.gridView){
			this.setState( {
				gridView: gv,
				manualSetGV: false
			});
		}
	}
	setGridListView(e){
		let gridView = e.target.getAttribute("data-view")==="grid";
		this.setState( {
			gridView:gridView,
			manualSetGV: true
		});
	}
	render () {
		let {match, edit, products, editBaseLink, ajaxState, actions, routes, device} = this.props ;
		let ProductsTbl = match.params.ProductsTbl || "All";
		let productType = match.params.product || match.params.cat || "DVR";
		let filtered = products;
		if (ProductsTbl && ProductsTbl !== "All"){
			filtered = products.filter( item => {
				return item.type == ProductsTbl
					|| item.brand == ProductsTbl;
			});
		}
				
		let mobile = !!(device.phone || device.mobile);
		let viewSettingStyle = {display: mobile ?"none":"block"};
		if ( !productType ||  filtered === []){
			return (<div/>);
		}
		
		
		let col = [], tHead =[];
		let obj = filtered[0];
		let data = [...filtered];
		for (let item of data) {
			if (item.images && item.images[0]){
				item.imageUrl= item.images[0];
				delete item.images;
			}
			if(edit){
				item.edit = editBaseLink;
			}
			if(this.props.delete){
				item.delete = "";
			}
		}

		
		tHead.push( "Image");
		col.push("imageUrl");
		for (let prop in obj) {
			let iMap = productEditColDetail.filter((item)=>item.db === prop ).pop();
			if ( !iMap || iMap.db === '_id' || iMap.db === 'imageUrl' ){
				continue;
			}
			tHead.push( (iMap && iMap.desc) || "");
			col.push(prop);
		}
		if(edit){
			tHead.push("Edit");
			col.push("edit");
		}
		if(this.props.delete){
			tHead.push("Delete");
			col.push("delete");
		}


		// console.log(Metadata[this.props.productType]);
		return (
			<div className="loading-wrap">
				<div className={`ajax-loading-big ${ajaxState > 0?'fade-show':'fade-hide'}`} ><img src="/build/img/ajax-loader.gif" alt=""/></div>
				<ul className="app-view" style={viewSettingStyle}>
					<li className="hiddenView fa fa-th-list btn-list" data-view="list" onClick={this.setGridListView}>
						<div className="bubble ">list view</div>
					</li>
					<li className="hiddenView fa fa-th btn-list" data-view="grid" onClick={this.setGridListView}>
						<div className="bubble ">grid view</div>
					</li>
				</ul>
				<div className="list-container" style={{display: this.state.gridView?"none":"block"}}>
					<SortableTbl tblData={data}
						tHead={tHead}
						customTd={[
									{custd: BaseProductTblImageComponent, keyItem: "imageUrl"},
									{custd: BaseProductEditComponent, keyItem: "edit"},
									{custd: BaseProductDeleteComponent, keyItem: "delete"}
									]}
						dKey={col} keyId="_id"
						productType={productType}
						actions={actions}
						params={match.params}/>
				</div>
				<div className="grid-container" style={{display: this.state.gridView?"block":"none"}}>
					{data.map((item, id)=>{
						let c = 0;
						item.stars && (c = (Math.round((item.stars.totalStars / item.stars.voteCount) * 100) / 100));
						return (
						<div key={id} className="col-sm-6 col-md-4 Grid">
							<div className="block-wrap">
								<Link to={`/products/${productType}/spec/${item._id}`}>
								<div className="block">
									<div className="">
										<ImageLoader
											src={item.imageUrl}
											minHeight= "200px"
											alt={`${item.brand} - ${productType} - ${item.type} - ${item.name}`}
											title={`${item.brand} - ${productType} - ${item.type} - ${item.name}`}
										/>
									</div>
									<div className="title">
										<span className="favorite"><i className="fa fa-heart" style={{color: "#CC3300"}}/> {item.favorite || 0}</span>
										<span className="rate"><StarsRated count={c}/></span>
										<p className="model ellipsis ">{item.name}</p>
										<p className="brand ellipsis ">{item.brand} - {item.type}</p>
									</div>
								</div>
								</Link>
							</div>
						</div>);
					})}
				</div>
			</div>
			);
		}
	};



ProductsTblPage.propTypes = {
	productType: React.PropTypes.string,
	actions: React.PropTypes.object,
	match: React.PropTypes.object,
	editBaseLink: React.PropTypes.string,
	delete: React.PropTypes.bool,
	edit: React.PropTypes.bool,
	products: React.PropTypes.array,
	routes: React.PropTypes.array,
	ajaxState: React.PropTypes.number,
	device:  React.PropTypes.object.isRequired
};
function mapStateToProps(state, ownProps) {
  return {
    device: state.device,
    products: state.products,
	ajaxState: state.ajaxCallsInProgress	
  };
}

ProductsTblPage = connect(mapStateToProps)(ProductsTblPage);

export default ProductsTblPage;

