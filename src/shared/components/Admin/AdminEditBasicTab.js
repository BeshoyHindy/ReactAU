import React from 'react';
import AdminEditInputArray from "./AdminEditInputArray";
import AdminEditImageArray from "./AdminEditImageArray";
import {productEditColDetail} from '../../Data/General';
import { deleteArrayMember} from "../Shared/Shared";

let initialStateDB = {
	cat : 1,
	images: [],
	description: []
};
for(let item of productEditColDetail){
	initialStateDB[item.db] = "";
}


class AdminEditBasicTab extends React.Component{
	constructor(props) {
		super(props);
		this.setCategory = this.setCategory.bind(this);
		this.setBasicInput = this.setBasicInput.bind(this);
		this.getFormInput = this.getFormInput.bind(this);
		this.setDataArray = this.setDataArray.bind(this);
		this.setNewImages = this.setNewImages.bind(this);
		this.deleteArrayMember = this.deleteArrayMember.bind(this);
		this.addArrayMember = this.addArrayMember.bind(this);
		
	}
	componentWillReceiveProps(nextProps) {
	}
	setDataArray(field, value){
		this.props.setData(this.props.tabId, {field, value});
	}
	deleteArrayMember(field, id){
		this.props.delArrayMember(this.props.tabId, field, id);
	}	
	addArrayMember(field, data){
		this.props.addArrayMember(this.props.tabId, field, data);
	}	
	setBasicInput (e){
		let props = {};
		props[e.target.name] = e.target.value.trim() || "";
		this.props.setData(this.props.tabId, {field: e.target.name, value: props[e.target.name]});
	}
	setNewImages(images){
		this.props.setNewFiles(this.props.tabId, this.props.fileField, images);
	}
	setCategory (e){
		let props = {cat: parseInt(e.target.value)};
		this.props.setData(this.props.tabId, {field: "cat", value: props.cat});
	}
	getFormInput(id ){
		let details = this.props.details;
		let item = productEditColDetail[id];
		let inputValue = (!details || details === {} || !details[item.db])? "" : details[item.db];
		let inputId = item.db;
		let inputDesc = item.desc;
		let opts = {};
        if (inputId === "_id" && this.props.params.id != 0 ) {
            opts['disabled'] = 'disabled';
        }
		opts['id'] = inputId;
		opts['name'] = inputId;
		opts['placeholder'] = `Please Key In ${inputDesc}`;
		opts['onChange'] = this.setBasicInput;
		opts['value'] = inputValue;
		opts['className'] = "form-control";
		switch(item.type){
			case 1: //text
				return (<input type="text" value={this.props.details[item.db]}  {...opts}/>);
			case 2: //textarea
				return (<textarea value={this.props.details[item.db]} rows="3" {...opts}/>);
			case 3: //file
				return (<input type="file" value="" {...opts}/>);
			case 4: //number
				return (<input type="number" value={inputValue} {...opts}/>);
			default: //text
				return (<input type="text" value={inputValue} {...opts}/>);
		}
	}
	render () {
		let {categories, details} = this.props;
		let cat = categories.filter((item) => {return item._id===details.cat ;})[0];

		let categoryOpts = {};
		if (this.props.params.id != 0 ) {
			categoryOpts['disabled'] = 'disabled';
		}
		return (
			<div className="admin-edit-tabwrap">
				<div className="row">
					<div className="col-xs-12">
						<div className="form-group">
							<label htmlFor="productCategory">Product Category</label>
							<select className="form-control" id="productCategory" value={details.cat} {...categoryOpts} onChange={this.setCategory}>
								{
									categories.map( function(item, id){
									return (<option key={id} value={item._id}> {item.categoryName}</option>);
									})
								}
							</select>
						</div>
					</div>

					{
						cat && cat.props && cat.props.map((item,id)=>{
							return 	item && productEditColDetail[id].db !== "imageUrl"
									? (
										<div   key={id} className={`col-xs-12 ${productEditColDetail[id].db === "desc"?'':'col-sm-6 col-lg-4'}`}>
										<div className="form-group">
											<label htmlFor={productEditColDetail[id].db}>{productEditColDetail[id].desc}</label>
											{
												this.getFormInput(id)
											}
										</div>
										</div>
									)
									:"";
							}
						)
					}
				</div>
				<div className="row">
					<div className="col-xs-12 col-md-6">
						<div className="form-group">
							<label>Images	</label>
							<AdminEditImageArray data={this.props.details.images} field="images" setNewImages={this.setNewImages} setData={this.setDataArray} 
									newImages={this.props.newImages} deleteArrayMember={this.deleteArrayMember}/>
						</div>
					</div>
					<div className="col-xs-12 col-md-6">
						<div className="form-group">
							<label>Description</label>
							<AdminEditInputArray data={this.props.details.description} field="description" setData={this.setDataArray}  
									deleteArrayMember={this.deleteArrayMember} addArrayMember={this.addArrayMember}/>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
AdminEditBasicTab.propTypes = {
	data: React.PropTypes.object,
	details: React.PropTypes.object.isRequired,
	params: React.PropTypes.object.isRequired,
	categories: React.PropTypes.array.isRequired,
	newImages: React.PropTypes.array,
	setNewFiles: React.PropTypes.func.isRequired,
	setData: React.PropTypes.func.isRequired,
	addArrayMember: React.PropTypes.func.isRequired,
	delArrayMember: React.PropTypes.func.isRequired,
	tabId: React.PropTypes.number.isRequired,
	fileField: React.PropTypes.string.isRequired,
};

export default AdminEditBasicTab;
