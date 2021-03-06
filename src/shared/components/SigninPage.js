if (process.env.BROWSER) {
	require ('../Sass/auth.sass');
}

import { connect } from 'react-redux';
import React from 'react';
import {  Field, reduxForm } from 'redux-form';

import * as actions from '../actions/authAction';
import connectDataFetchers from '../lib/connectDataFetchers.jsx';
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
			this.context.router.history.push(`/user`);
		}
	}
	componentWillReceiveProps(nextProps) {
		if (nextProps.auth.success){
			this.context.router.history.push(`/user`);
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
					<Breadcrumb linkPair={[{link:"/user", desc:"User"},{link:"/signup", desc:"Sign Up"}]}/>
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
};

SigninPage.propTypes = {
	handleSubmit: React.PropTypes.func.isRequired,
	submitting: React.PropTypes.bool.isRequired,
	pristine: React.PropTypes.bool.isRequired,
	userSignin: React.PropTypes.func.isRequired,
	errorMessage: React.PropTypes.string,
	auth: React.PropTypes.object.isRequired,
	location: React.PropTypes.object.isRequired,
};
SigninPage.contextTypes = {
	router: React.PropTypes.object
};
function mapStateToProps(state) {
  return {
    auth: state.auth,
		errorMessage: state.auth.error
  };
}


export default connect(mapStateToProps, actions)(connectDataFetchers(reduxForm({
														form: 'signin',
														validate,                // <--- validation function given to redux-form
													})(SigninPage), [  ]));
