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
				imagesUpload: initialImageUpload,
				filesUpload: initialDocsUpload, 
				detailPostProgress: 0,
				newDocs: [],
			};
		this.submit = this.submit.bind(this);
		this.setTab = this.setTab.bind(this);
		this.setBasic = this.setBasic.bind(this);
		this.delArrayMember = this.delArrayMember.bind(this);
		this.setArrayMember = this.setArrayMember.bind(this);
		this.addArrayMember = this.addArrayMember.bind(this);
		this.setNewFiles = this.setNewFiles.bind(this);
		this.imageFileProgress = this.imageFileProgress.bind(this);
		this.docsFileProgress = this.docsFileProgress.bind(this);
		this.detailProgress = this.detailProgress.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		if (this.props != nextProps){
			let {details} = nextProps;
			this.setState({details: isEmptyObject(details)?initialStateDB:details});			
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
		const newState  = update(this.state, {[field]: {newData:{$set: data}}});
		this.setState(newState);
	}
	imageFileProgress(progressEvent) {
		var percentCompleted = Math.round( (progressEvent.loaded * 100) / progressEvent.total );
		const newState  = update(this.state, {imagesUpload: {progress:{$set: percentCompleted}}});
		this.setState(newState);
	}
	docsFileProgress(progressEvent) {
		var percentCompleted = Math.round( (progressEvent.loaded * 100) / progressEvent.total );
		const newState  = update(this.state, {imagesUpload: {progress:{$set: percentCompleted}}});
		this.setState(newState);
	}
	detailProgress(progressEvent) {
		var percentCompleted = Math.round( (progressEvent.loaded * 100) / progressEvent.total );
		this.setState({detailPostProgress: percentCompleted});
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

		this.setState({detailPostProgress: 1});
		let nData = details.images;
		let fileList = this.state.imagesUpload.newData;
		if (fileList.length){
			const newState  = update(this.state, {imagesUpload: {progress:{$set: 1}}});
			this.setState(newState);
			for(let item of fileList) {
				formData.append('uploadImages', item.file);
				nData.push( `/api/img/products/${item.file.name}`);
			}
		}

		let imgFileconfig = {
			onUploadProgress: this.imageFileProgress
		};
		let docsFileconfig = {
			onUploadProgress: this.docsFileProgress
		};

		DetailApi.setProductDetails(details, this.detailProgress)
		.then(details => {
			this.setState({detailPostProgress: 0});
			if (fileList.length) 
				return FileApi.upLoadImages(this.state.details._id, formData, imgFileconfig);

			return {};
		})
		.then(details => {
			let actionData ={};
			let cat = this.props.categories.filter((item) => {return item._id===this.state.details.cat;})[0].categoryName;
			actionData.params = Object.assign({},this.props.params);
			this.props.dispatch(loadDetails(actionData));

			actionData.params.cat = cat;
			this.props.dispatch(loadProductList(actionData));
			this.setState({imagesUpload: initialImageUpload, detailPostProgress: 0});
			
			// alert("success!!");
			if((this.props.params.id == 0))
				this.props.router.push(`/admin/productList/${cat}`);
		}).catch(error => {
			alert(error);
			// throw(error);
		});
	}
	render () {

		let {categories, details,params} = this.props;
		let {imagesUpload, filesUpload,detailPostProgress} = this.state;
		let showAjaxLoading = (imagesUpload.progress || detailPostProgress || filesUpload.progress
							|| this.props.ajaxState > 0 || !categories || categories.length ===0 );
		
		return (
	<div className="loading-wrap">
		<div className={`ajax-loading-big ${showAjaxLoading?'fade-show':'fade-hide'}`} >
			<img src="/img/ajax-loader.gif" alt=""/>
			<div className="ajax-loading-progress">
				{	(detailPostProgress )
						? `Apply Change... ${detailPostProgress} % ` 
						:(imagesUpload.progress )
							? `Uploading Images Files... ${imagesUpload.progress} % ` 
							:  (filesUpload.progress )
								? `Uploading Docs Files... ${filesUpload.progress} % ` 
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
							<AdminEditBasicTab details={this.state.details}  tabId={0} params={params} setData={this.setBasic} setNewFiles={this.setNewFiles}
												fileField="imagesUpload" categories={categories} newImages={imagesUpload.newData}/>
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
