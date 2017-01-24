import { connect } from 'react-redux';
import React from 'react';
import update from 'immutability-helper';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs-isomorphic';

import connectDataFetchers from '../../lib/connectDataFetchers.jsx';
import { Breadcrumb , BigHeader, OrangeBoard, isEmptyObject} from "../Shared/Shared";

import AdminEditBasicTab from "./AdminEditBasicTab";
import AdminEditSpecTab from "./AdminEditSpecTab";
import AdminEditDocsTab from "./AdminEditDocsTab";
import AdminEditStdPkgTab from "./AdminEditStdPkgTab";
import AdminEditOptTab from "./AdminEditOptTab";
import { loadCategories } from '../../actions/adminActions';
import { loadDetails } from '../../actions/detailsActions';
import { loadProductList } from '../../actions/productsActions';
import AdminEditInputArray from "./AdminEditInputArray";

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

let initialImageUpload = {					
	progress: 0,
	newData: []
};

let initialDocsUpload = {					
	progress: 0,
	newData: []
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
			upload:{
				images: initialImageUpload,
				docs: initialDocsUpload, 
			},
			delete:{images: [], docs:[]},
			detailPostProgress: 0,
		};
		this.submit = this.submit.bind(this);
		this.setTab = this.setTab.bind(this);
		this.setBasic = this.setBasic.bind(this);
		this.delArrayMember = this.delArrayMember.bind(this);
		this.setArrayMember = this.setArrayMember.bind(this);
		this.addArrayMember = this.addArrayMember.bind(this);
		this.setNewFiles = this.setNewFiles.bind(this);
		this.fileProgress = this.fileProgress.bind(this);
		this.detailProgress = this.detailProgress.bind(this);
		this.processFileUploadDelete = this.processFileUploadDelete.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		if (this.props != nextProps){
			let {details} = nextProps;
			this.setState({details: isEmptyObject(details)?initialStateDB:details});			
		}
	}
	setTab(tabId){
		// tabId = parseInt(tabId);
		// if (this.props.details.member )
		// 	tabId++;
		// if (this.props.details.optinal )
		// 	tabId++;
		return parseInt(tabId);
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
		let newCfg = {
				selectedTab : {$set: this.setTab(tabId)},
				details: {[field]:{$splice: [[id, 1]]}}
			};

		if (field == "docs" || field =="images"){
			newCfg.delete=  {[field]:{$push: [this.state.details[field][id]]}};
		}

		this.setState(update(this.state, newCfg));		
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
	setNewFiles(tabId, field, data){	
		const newState  = update(this.state, {
								selectedTab : {$set: this.setTab(tabId)},
								upload:{[field]: {newData:{$set: data}}}}
						);
		this.setState(newState);
	}
	fileProgress(progressEvent, field) {
		let percentCompleted = Math.round( (progressEvent.loaded * 100) / progressEvent.total );
		this.setState({detailPostProgress: 0});
		const newState  = update(this.state, {upload:{[field]:{progress:{$set: percentCompleted}}}});
		this.setState(newState);
	}
	detailProgress(progressEvent) {
		let percentCompleted = Math.round( (progressEvent.loaded * 100) / progressEvent.total );
		this.setState({detailPostProgress: percentCompleted});
	}
	processFileUploadDelete(field){
		let AddList = this.state.upload[field].newData;
		let delList = this.state.delete[field];
		let total = (AddList.length || 0) + (delList.length || 0);
		if (!total)
			return null;

		let formData = new FormData();
		formData.append('id', this.state.details._id);
		const newState  = update(this.state, {upload:{[field]: {progress:{$set: 1}}}});
		this.setState(newState);			
	
		if (AddList.length){
			for(let item of AddList) {
				formData.append(`upload_${field}`, item.file);
			}
		}
	
		(delList.length) && formData.append(`del_${field}`, JSON.stringify(delList));
		
		return formData;
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

		let formData = new FormData();

		this.setState({detailPostProgress: 1});
		
		let imgFileconfig = {
			onUploadProgress: (p) => this.fileProgress(p, "images")
		};
		let docsFileconfig = {
			onUploadProgress: (p) => this.fileProgress(p, "docs")
		};

		DetailApi.setProductDetails(details, this.detailProgress)
		.then(details => {
			let formData = this.processFileUploadDelete("images");
			if (formData) 
				return FileApi.upLoadImages(this.state.details._id, formData, imgFileconfig);

			return {};
		})
		.then(details => {
			let formData = this.processFileUploadDelete("docs");
			if (formData) 
				return FileApi.upLoadDocs(this.state.details._id, formData, docsFileconfig);

			return {};
		})		
		.then( e => {
			let actionData ={};
			let cat = this.props.categories.filter((item) => {return item._id===this.state.details.cat;})[0].categoryName;
			actionData.params = Object.assign({},this.props.params);
			this.props.dispatch(loadDetails(actionData));

			actionData.params.cat = cat;
			this.props.dispatch(loadProductList(actionData));
			this.setState({		upload: {images: initialImageUpload, docs: initialDocsUpload},
								delete: {images: [], docs: []},
								detailPostProgress: 0});
			if((this.props.params.id == 0))
				this.props.router.push(`/admin/productList/${cat}`);
		}).catch(error => {
			alert("Process Fail, Error Message: " + error.err);
			console.log(error);
			this.setState({		upload: {images: initialImageUpload, docs: initialDocsUpload},
								delete: {images: [], docs: []},
								detailPostProgress: 0});
		});
	}
	render () {

		let {categories, details,params} = this.props;
		let {upload, detailPostProgress} = this.state;
		let showAjaxLoading = (upload.images.progress || upload.docs.progress || detailPostProgress  
							|| this.props.ajaxState > 0 || !categories || categories.length ===0 );
		let tabId=0;
		return (
	<div className="loading-wrap">
		<div className={`ajax-loading-big ${showAjaxLoading?'fade-show':'fade-hide'}`} >
			<img src="/img/ajax-loader.gif" alt=""/>
			<div className="ajax-loading-progress">
				{	(detailPostProgress )
						? `Apply Change... ${detailPostProgress} % ` 
						:(upload.images.progress )
							? `Upload Images Files... ${upload.images.progress} % ` 
							:  (upload.docs.progress )
								? `Upload Docs Files... ${upload.docs.progress} % ` 
								: "Done !!"
				}</div>
		</div>
			<div className="row">
				<div className="col-xs-12">
					<Breadcrumb linkPair={[{link:"Home", desc:"Home"},	{link:"/admin/productChange/0", desc:"Administration"},
																		{link:"", desc:params.id !=0 ?"Edit Product":"Add Product"}]}/>
					<BigHeader smallTitle="">{params.id !=0 ?`Edit Product - ${details.name}`:"Add Product"}</BigHeader>
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
							<AdminEditBasicTab details={this.state.details}  tabId={tabId++} params={params} setData={this.setBasic} delArrayMember={this.delArrayMember} 
												addArrayMember={this.addArrayMember} setNewFiles={this.setNewFiles} fileField="images" categories={categories} newImages={upload.images.newData}/>
						</TabPanel>

						{
							(this.state.details.cat===2 ) && (
								<TabPanel>
									<AdminEditStdPkgTab tabId={tabId++} member={this.state.details.member} field="member" delArrayMember={this.delArrayMember}  
											addArrayMember={this.addArrayMember} setArrayMember={this.setArrayMember} />
								</TabPanel>
							)
						}

						{
							(this.state.details.cat===2 ) && (
								<TabPanel>
									<AdminEditOptTab tabId={tabId++} member={this.state.details.optional} field="optional" delArrayMember={this.delArrayMember}  
											addArrayMember={this.addArrayMember} setArrayMember={this.setArrayMember} />
								</TabPanel>
							)
						}

						{
							(
								<TabPanel>
									<AdminEditSpecTab tabId={tabId++} spec={this.state.details.spec} field="spec" delArrayMember={this.delArrayMember}  
											setData={this.setSpecInput} addArrayMember={this.addArrayMember} setArrayMember={this.setArrayMember} />
								</TabPanel>
							)
						}

						{
							(
								<TabPanel>
									<AdminEditDocsTab  tabId={tabId++} docs={this.state.details.docs} field="docs" delArrayMember={this.delArrayMember}  newDocs={upload.docs.newData} 
											fileField="docs" setNewDocs={this.setNewFiles} addArrayMember={this.addArrayMember} setArrayMember={this.setArrayMember} />
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
