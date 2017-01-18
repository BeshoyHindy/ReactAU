import React from 'react';
import AdminEditInputArray from "./AdminEditInputArray";
import AdminEditImageArray from "./AdminEditImageArray";
import {productEditColDetail} from '../../Data/General';

let initialStateDB = {
	cat : 1,
};
for(let item of productEditColDetail){
	initialStateDB[item.db] = "";
}


class AdminEditBasicTab extends React.Component{
	constructor(props) {
		super(props);
		this.state = (props.params.id == 0) ? initialStateDB: props.details;
		this.setCategory = this.setCategory.bind(this);
		this.setBasicInput = this.setBasicInput.bind(this);
		this.getFormInput = this.getFormInput.bind(this);
		this.setDataArray = this.setDataArray.bind(this);
	}
	componentWillReceiveProps(nextProps) {
		if (this.props != nextProps){
			this.setState((nextProps.params.id == 0) ? initialStateDB: nextProps.details);
		}
	}
	setDataArray(field, data){

		let props = {};
		props[field] = data;
		this.setState(props);
		this.props.setData(field, data);
	}
	setBasicInput (e){
		let props = {};
		props[e.target.name] = e.target.value.trim() || "";
		this.setState(props);
		this.props.setData(e.target.name, props[e.target.name]);
	}
	setImageArray(field, data){
	}
	setCategory (e){
		let props = {cat: parseInt(e.target.value)};
		this.setState(props);
		this.props.setData("cat", props.cat);
	}
	getFormInput(id ){
		let details = this.state;
		let item = productEditColDetail[id];
		let inputValue = (!details || details === {} || !details[item.db])? "" : details[item.db];
		let inputId = item.db;
		let inputDesc = item.desc;
		let opts = {};
        if (inputId === "id" && this.props.params.id != 0 ) {
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
				return (<input type="text" value={inputValue}  {...opts}/>);
			case 2: //textarea
				return (<textarea value={inputValue} rows="3" {...opts}/>);
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
		let cat = categories.filter((item) => {return item._id===this.state.cat ;})[0];

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
							<select className="form-control" id="productCategory" value={this.state.cat} {...categoryOpts} onChange={this.setCategory}>
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
							<AdminEditImageArray data={this.state.images} field="images" setImage={this.setImageArray}  setData={this.setDataArray}/>
						</div>
					</div>
					<div className="col-xs-12 col-md-6">
						<div className="form-group">
							<label>Description</label>
							<AdminEditInputArray data={this.state.description} field="description" setData={this.setDataArray}/>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
AdminEditBasicTab.propTypes = {
	data: React.PropTypes.object
};

export default AdminEditBasicTab;