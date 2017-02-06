import { connect } from 'react-redux';
import React from 'react';
import {  Field, reduxForm } from 'redux-form';

import * as actions from '../actions/authAction';
import connectDataFetchers from '../lib/connectDataFetchers.jsx';
import { loadCategories } from '../actions/adminActions';
import { Breadcrumb } from "./Shared/Shared";
import  {renderField} from "./Shared/renderReduxForm";

class SigninPage extends React.Component {
	constructor(props) {
		super(props);
		this.handleFormSubmit = this.handleFormSubmit.bind(this);
		this.renderAlert = this.renderAlert.bind(this);
	}	
	componentWillMount() {
		if (this.props.auth.success){
			this.props.router.push(`/user`);	
		}
	}	
	componentWillReceiveProps(nextProps) {
		if (nextProps.auth.success){
			this.props.router.push(`/user`);	
		}
	}	  
	handleFormSubmit(values) {
		// Call action creator to sign up the user!
			let {email, password} = values;
			this.props.userSignin({email, password}, this.props.location.pathname);
	}

	renderAlert() {
		if (this.props.auth.error) {
		return (
			<div className="alert alert-danger">
			<strong>Oops!</strong> { this.props.errorMessage} !!
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
					<Breadcrumb linkPair={[{link:"user", desc:"User"},{link:"signup", desc:"Sign Up"}]}/>
					<div className="well">
						<div className="panel panel-danger sign-up-panel">
							<div className="panel-heading">
								<h3 className="panel-title">Sign In</h3>
							</div>
							<div className="panel-body sign-up">
								<form onSubmit={handleSubmit(this.handleFormSubmit)}>
									<div className="col-lg-12">
										<Field name="email" component={renderField} type="email" label="E-Mail"/>
										<Field name="password" component={renderField} type="password" label="Password" />
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
	);}
}


const validate = values => {
  const errors = {};
  if (!values.email) {
    errors.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }

  if (!values.password) {
    errors.password = 'Please enter a password';
  }

  return errors;
}

SigninPage.propTypes = {
};

function mapStateToProps(state) {
  return { 
    auth: state.auth,
		errorMessage: state.auth.error
  };
}

export default connect(mapStateToProps, actions)(reduxForm({
													form: 'signup',
													validate,                // <--- validation function given to redux-form
												} )(SigninPage));

