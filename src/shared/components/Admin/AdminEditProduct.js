import { connect } from 'react-redux';
import React from 'react';
import update from 'immutability-helper';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs-isomorphic';

import connectDataFetchers from '../../lib/connectDataFetchers.jsx';
import { Breadcrumb , BigHeader, OrangeBoard} from "../Shared/Shared";

import AdminEditBasicTab from "./AdminEditBasicTab";
import AdminEditSpecTab from "./AdminEditSpecTab";
import { loadCategories } from '../../actions/adminActions';
import { loadDetails } from '../../actions/detailsActions';
import { loadProductList } from '../../actions/productsActions';

import DetailApi from '../../api/DetailsApi';
import {productEditColDetail} from '../../Data/General';

let initialStateDB = {
	cat : 1,
	description: [],
	spec: [],
	images: [],
	docs: [],
	member: [],
	optinal: []
};
for(let item of productEditColDetail){
	initialStateDB[item.db] = "";
}

let idCounter = 0;
const generateIds = () => `custom-id-${idCounter++}`

class AdminEditProductPage extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
				details : (props.params.id == 0) ? initialStateDB: props.details,
				selectedTab : 0
			};
		this.submit = this.submit.bind(this);
		this.setBasic = this.setBasic.bind(this);
		this.setSpec = this.setSpec.bind(this);

	}
	componentWillReceiveProps(nextProps) {
		if (this.props != nextProps){
			this.setState({details:nextProps.details});
		}
	}
	setBasic(field, data){
		const newState  = update(this.state, {
			details: {
				[field]:{$set: data}
			}
		});		
		this.setState(newState);
	}
	setSpec(tabId, data){
		if (this.props.details.member )
			tabId++;
		if (this.props.details.optinal )
			tabId++;

		const newState  = update(this.state, {
			selectedTab : {$set: tabId},
			details: {
				spec:{
					[data.id]:{
						members:{
							[data.subId]:{
								[data.subField]:{$set: data.value}
							}
						}
					}
				}
			}
		});
		// nSpec[data.id].members[data.subId][data.subField] = data.value;
		this.setState(newState);
	}
	submit (e){
		e.preventDefault();
		if (!this.state.details.name || !this.state.details.name.trim() || this.state.details.name.trim() === ""){
			alert("Please key in product name...");
			return;
		}

		let details = Object.assign({}, this.state.details);

		for(let i in details) {
			if ( details[i] == "" || details[i] === null || details[i] === {} || details[i] === [] ) {
			delete details[i];
			}
		}

		DetailApi.setProductDetails(details)
		.then(details => {
			let cat = this.props.categories.filter((item) => {return item._id===this.state.details.cat;})[0];
			this.props.dispatch(loadProductList({cat: cat.categoryName || "DVR", subType:"All"}));

			let actionData ={};
			actionData.params = Object.assign({},this.props.params);
			this.props.dispatch(loadDetails(actionData));
			
			alert("success!!");
			if((this.props.params.id == 0))
				this.props.router.push(`/admin/productList/${cat.categoryName}`);
		}).catch(error => {
			throw(error);
		});
	}
	render () {
		let {categories, details,params} = this.props;
		return (
	<div className="loading-wrap">
		<div className={`ajax-loading-big ${(this.props.ajaxState > 0 || !categories || categories.length ===0 )?'fade-show':'fade-hide'}`} >
			<img src="/img/ajax-loader.gif" alt=""/>
		</div>
		<form>
			<div className="row">
				<div className="col-xs-12">
					<Breadcrumb linkPair={[{link:"Home", desc:"Home"},{link:"/admin/productChange/0", desc:"Administration"},{link:"", desc:this.props.params.id !=0 ?"Edit Product":"Add Product"}]}/>
					<BigHeader smallTitle="">{this.props.params.id !=0 ?`Edit Product - ${details.name}`:"Add Product"}</BigHeader>
				</div>
			</div>
			<div className="row">
				<div className="col-xs-12">
					<button className="btn btn-danger" onClick={this.submit}>Apply Change</button>
				</div>
			</div>
			<div className="row">
				<div className="col-xs-12">
					<Tabs selectedIndex={this.state.selectedTab}	generateIdsFn={generateIds}>
						<TabList>
							{	<Tab>Basic Settings</Tab>  }
							{	(this.state.details.cat===2 ) && (<Tab>Standard Package</Tab> ) }
							{	(this.state.details.cat===2 ) && (<Tab>Optinal Package</Tab> ) }
							{	(	<Tab>Specification</Tab> ) }
							{	(	<Tab>Download</Tab> ) }
						</TabList>

						<TabPanel>
							<AdminEditBasicTab details={this.state.details} params={this.props.params} setData={this.setBasic} categories={categories}/>
						</TabPanel>

						{
							(this.state.details.cat===2 ) && (
								<TabPanel>

								</TabPanel>
							)
						}

						{
							(this.state.details.cat===2 ) && (
								<TabPanel>

								</TabPanel>
							)
						}

						{
							(
								<TabPanel>
									<AdminEditSpecTab tabId={1} spec={this.state.details.spec} setData={this.setSpec}/>
								</TabPanel>
							)
						}

						{
							(
								<TabPanel>

								</TabPanel>
							)
						}
					</Tabs>
				</div>
			</div>
		</form>
	</div>		
		);
	}
}


AdminEditProductPage.propTypes = {
	categories: React.PropTypes.array,
	ajaxState: React.PropTypes.number,
	details: React.PropTypes.object,
};

function mapStateToProps(state, ownProps) {
  return {
    categories: state.categories,
	details: state.details,
	ajaxState: state.ajaxCallsInProgress
  };
}

const AdminEditProductPageWrap = connect(mapStateToProps)(
    connectDataFetchers(AdminEditProductPage, [ loadCategories, loadDetails ])
);

export default AdminEditProductPageWrap;
