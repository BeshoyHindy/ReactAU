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
		this.handleFormSubmit = this.handleFormSubmit.bind(this);
		this.renderAlert = this.renderAlert.bind(this);
	}	
	handleFormSubmit(values) {
    // Call action creator to sign up the user!
		let user = {};
		user.email =  values.email;		
		user.password =  values.password;		
		user.accessRight =  values.accessRight;		
		user.profile.username =  values.username;		
		user.profile.picture =  values.picture;		
		AdminApi.addUser(user)			
		.then( e => {
			alert("Add Success");
		}).catch(error => {
			alert("Process Fail, Error Message: " + error.err);
			console.log(error);
		});
	}

	renderAlert() {
		if (this.props.errorMessage) {
			return (
				<div className="alert alert-danger">
				<strong>Oops!</strong> {this.props.errorMessage}
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
											options={[{value:"normal", text:"Normal User"}, {value:"admin", text:"Administrator"}]} />
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
  form: 'signup',
  validate,                // <--- validation function given to redux-form
})(AddUserPage);


export default AddUserPage = connect()(
    connectDataFetchers(AddUserPage, [ loadCategories ])
);

