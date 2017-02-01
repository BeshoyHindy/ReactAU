import { connect } from 'react-redux';
import React from 'react';
import {  Field, reduxForm } from 'redux-form';

import AdminApi from '../../api/AdminApi';
import connectDataFetchers from '../../lib/connectDataFetchers.jsx';
import { loadCategories } from '../../actions/adminActions';
import { Breadcrumb } from "../Shared/Shared";
import  {renderField, renderSelectField, renderDropzoneInput} from "../Shared/renderReduxForm";

class AddUserPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			upload:0,
			errorMessage: "",
			success: false
		};
		this.handleFormSubmit = this.handleFormSubmit.bind(this);
		this.renderAlert = this.renderAlert.bind(this);
		this.fileProgress = this.fileProgress.bind(this);
	}	
	handleFormSubmit(values) {
		let FileUploadProgress = (p) => this.fileProgress(p);
		let formData = new FormData();
		formData.append('password', values.password);
		formData.append('email', values.email);
		formData.append('username', values.username);
		formData.append('accessRight', values.accessRight);
		if (values.picture){
			formData.append('upload_picture', values.picture[0]);
		}
		this.setState({upload: 1});

		AdminApi.addUser(formData, FileUploadProgress)
		.then( e => {
			this.setState({	upload: 0, errorMessage:"", success: true});			
		}).catch(error => {
			this.setState({	upload: 0, errorMessage: "Process Fail, Error Message: " + error.err, success: false});
		});
	}
	fileProgress(progressEvent) {
		let percentCompleted = Math.round( (progressEvent.loaded * 100) / progressEvent.total );
		this.setState({upload: percentCompleted});
	}
	renderAlert() {
		if (this.state.errorMessage || this.state.success) {
			return (
				<div className={`alert ${this.state.success?"alert-success":"alert-danger"}`}>
				{this.state.success?"Success !!":(<div><strong>Oops!</strong> { this.state.errorMessage} !!</div>)}
				</div>
			);
		}
	}
  render() {
    const { handleSubmit, pristine, submitting } = this.props;

    return (

	<div className="container">
		<div className="row">
			<div className="col-lg-12 ">
				<Breadcrumb linkPair={[{link:"Home", desc:"Home"},	{link:"/admin/productChange/0", desc:"Administration"},
																		{link:"/admin/addUser", desc:"Add User"}]} />
				<div className="well">
					<div className="panel panel-danger add-user-panel">
						<div className="panel-heading">
							<h3 className="panel-title">Add User</h3>
						</div>
						<div className="panel-body sign-up">
							<form onSubmit={handleSubmit(this.handleFormSubmit)}>
								<div className="col-lg-6 ">
									<Field name="picture" component={renderDropzoneInput} label="Add a picture"/>
									<Field name="username" component={renderField} type="text" label="User Name"/>									
								</div>
								<div className="col-lg-6 ">
									<Field name="email" component={renderField} type="email" label="E-Mail" require={true}/>
									<Field name="password" component={renderField} type="password" label="Password"  require={true}/>
									<Field name="passwordConfirm" component={renderField} type="password" label="Confirm Password" require={true}/>
									<Field name="accessRight" component={renderSelectField}  label="User Type" 
											options={[{value:"0", text:"Normal User"}, {value:"8", text:"Administrator"}]} />
								</div>
								<div className="col-lg-12">
									{this.renderAlert()}
									<hr/>
									<div>
										<button type="submit" disabled={pristine || submitting} className="btn btn-warning submit-btn">Submit</button>
									</div>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	)}
}


const validate = values => {
	const errors = {}
	if (!values.email) {
		errors.email = 'Required'
	} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
		errors.email = 'Invalid email address'
	}

	if (!values.password) {
		errors.password = 'Please enter a password';
	}

	if (!values.passwordConfirm) {
		errors.passwordConfirm = 'Please enter a password confirmation';
	}

	if (values.password !== values.passwordConfirm) {
		errors.password = 'Passwords must match';
	}
	return errors;
}

AddUserPage.propTypes = {
};


AddUserPage = reduxForm({
  form: 'adduser',
  validate,                // <--- validation function given to redux-form
})(AddUserPage);

export default AddUserPage;

