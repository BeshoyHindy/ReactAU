import { connect } from 'react-redux';
import React from 'react';
import update from 'immutability-helper';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs-isomorphic';

import connectDataFetchers from '../../lib/connectDataFetchers.jsx';
import { Breadcrumb , BigHeader, OrangeBoard, isEmptyObject} from "../Shared/Shared";

import AdminEditBasicTab from "./AdminEditBasicTab";
import AdminEditSpecTab from "./AdminEditSpecTab";
import { loadCategories } from '../../actions/adminActions';
import { loadDetails } from '../../actions/detailsActions';
import { loadProductList } from '../../actions/productsActions';

import DetailApi from '../../api/DetailsApi';
import FileApi from '../../api/FileApi';
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
				selectedTab : 0,
				newImages: [],
				newDocs: [],
			};
		// console.log("AdminEditProductPage, constructors", this.state);
		this.submit = this.submit.bind(this);
		this.setTab = this.setTab.bind(this);
		this.setBasic = this.setBasic.bind(this);
		this.delArrayMember = this.delArrayMember.bind(this);
		this.setArrayMember = this.setArrayMember.bind(this);
		this.addArrayMember = this.addArrayMember.bind(this);
		this.setNewFiles = this.setNewFiles.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		if (this.props != nextProps){
			let {details} = nextProps;
			this.setState({details: isEmptyObject(details)?initialStateDB:details});
			// console.log("AdminEditProductPage, componentWillReceiveProps", isEmptyObject(details)?details:initialStateDB);
		}
	}
	setTab(tabId){
		tabId = parseInt(tabId);
		if (this.props.details.member )
			tabId++;
		if (this.props.details.optinal )
			tabId++;
		return tabId;
	}
	setBasic(tabId, data){
		tabId = parseInt(tabId);		
		const newState  = update(this.state, {
			selectedTab : {$set: tabId},
			details: {
				[data.field]:{$set: data.value}
			}
		});
		this.setState(newState);
	}
	delArrayMember(tabId, field, id){
		const newState  = update(this.state, {
			selectedTab : {$set: this.setTab(tabId)},
			details: {[field]:{$splice: [[id, 1]]}}
		});
		this.setState(newState);
	}
	addArrayMember(tabId, field, data){
		const newState  = update(this.state, {
			selectedTab : {$set: this.setTab(tabId)},
			details: {[field]: {$push: [data]}}}
		);
		this.setState(newState);
	}
	setArrayMember(tabId, field, data){		
		const newState  = update(this.state, {
			selectedTab : {$set: this.setTab(tabId)},
			details: {[field]: {$set: data}}}
		);
		this.setState(newState);
	}
	setNewFiles(field, data){		
		const newState  = update(this.state, {[field]: {$set: data}});
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

		var formData = new FormData();

		let fileList = this.state.newImages;
		for(var x=0;x<fileList.length;x++) {
			formData.append('file'+x, fileList[x]);    
			console.log('appended a file');
		}

//http://stackoverflow.com/questions/23219033/show-a-progress-on-multiple-file-upload-jquery-ajax
		DetailApi.setProductDetails(details)
		.then(details => {
 			 return FileApi.upLoadImages(this.state.details._id, formData);
		})
		.then(details => {
			let actionData ={};
			let cat = this.props.categories.filter((item) => {return item._id===this.state.details.cat;})[0].categoryName;
			actionData.params = Object.assign({},this.props.params);
			this.props.dispatch(loadDetails(actionData));

			actionData.params.cat = cat;
			this.props.dispatch(loadProductList(actionData));

			
			alert("success!!");
			if((this.props.params.id == 0))
				this.props.router.push(`/admin/productList/${cat}`);
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
							<AdminEditBasicTab details={this.state.details}  tabId={0} params={this.props.params} setData={this.setBasic} setNewFiles={this.setNewFiles}
												fileField="newImages" categories={categories}/>
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
									<AdminEditSpecTab tabId={1} spec={this.state.details.spec} field="spec" delArrayMember={this.delArrayMember}  
											setData={this.setSpecInput} addArrayMember={this.addArrayMember} setArrayMember={this.setArrayMember} />
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
