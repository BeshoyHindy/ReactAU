import { connect } from 'react-redux';
import React from 'react';
import {  Field, reduxForm } from 'redux-form';
import Dropzone from 'react-dropzone';

import * as actions from '../../actions/userAction';
import  {renderField, renderSelectField, renderDropzoneInput} from "../Shared/renderReduxForm";
import FileApi from '../../api/FileApi';

class editUserTab extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			upload:0,
		};
		this.handleFormSubmit = this.handleFormSubmit.bind(this);
		this.renderAlert = this.renderAlert.bind(this);
		this.fileProgress = this.fileProgress.bind(this);
	}	
	handleFormSubmit(values) {
		let imgFileUploadProgress = (p) => this.fileProgress(p);
		let formData = new FormData();
		formData.append('password', values.password);
		formData.append('email', values.email);
		formData.append('username', values.username);
		if (values.picture){
			formData.append('upload_picture', values.picture[0]);
		}
		this.setState({upload: 1});

		this.props.userChangeProfile(formData, imgFileUploadProgress);
	}
	fileProgress(progressEvent) {
		let percentCompleted = Math.round( (progressEvent.loaded * 100) / progressEvent.total );
		this.setState({upload: percentCompleted});
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
	let {auth, initialValues:{picture}} = this.props;
	
    return (
	<div className="loading-wrap">
		<div className={`ajax-loading-big ${((this.state.upload > 0) || (!auth.success)) ?'fade-show':'fade-hide'}`} >
			<img src="/img/ajax-loader.gif" alt=""/>
			<div className="ajax-loading-progress">
				Processing....{this.state.upload}%
			</div>
		</div>		
		<div className="well">
			<div className="panel panel-danger add-user-panel">
				<div className="panel-heading">
					<h3 className="panel-title">Edit User Profile</h3>
				</div>
				<div className="panel-body sign-up">
					<form onSubmit={handleSubmit(this.handleFormSubmit)}>
						<div className="col-lg-6 ">
							<Field name="picture" src={picture} component={renderDropzoneInput} label="Add a picture"/>
						</div>
						<div className="col-lg-6 ">
							<Field name="username" component={renderField} type="text" label="User Name"/>									
							<Field name="email" component={renderField} type="email" label="E-Mail" require={true}/>
							<Field name="password" component={renderField} type="password" label="Reset Password"  require={true}/>
							<Field name="passwordConfirm" component={renderField} type="password" label="Confirm Reset Password" require={true}/>
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

editUserTab.propTypes = {
};

function mapStateToProps(state, ownProps) {
  return { 
	initialValues: {
		username: (state.auth.user && state.auth.user.profile && state.auth.user.profile.username) || '',
		email: (state.auth.user && state.auth.user.email) || '',
		picture: (state.auth.user && state.auth.user.profile && state.auth.user.profile.picture) || '',
	},	
	auth: state.auth,
	errorMessage: state.auth.error
  };
}

editUserTab = reduxForm({
  form: 'edituser',
  validate,                // <--- validation function given to redux-form
})(editUserTab);

editUserTab = connect(mapStateToProps, actions)(editUserTab);

export default editUserTab;

