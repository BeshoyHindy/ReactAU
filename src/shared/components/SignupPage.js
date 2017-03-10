if (process.env.BROWSER) {
	require ('./auth.sass');
}


import { connect  } from 'react-redux';
import React from 'react';
import {  Field, reduxForm } from 'redux-form';

import * as actions from '../actions/authAction';
import connectDataFetchers from '../lib/connectDataFetchers.jsx';
import { getDevice } from '../actions/deviceAction';
import { loadCategories } from '../actions/adminActions';
import { Breadcrumb } from "./Shared/Shared";
import  {renderField} from "./Shared/renderReduxForm";

class SignupPage extends React.Component {
	constructor(props) {
		super(props);
		this.handleFormSubmit = this.handleFormSubmit.bind(this);
		this.renderAlert = this.renderAlert.bind(this);
	}	
  handleFormSubmit(values) {
    // Call action creator to sign up the user!
		let {email, password} = values;		
		this.props.userSignup({email, password});
  }

  renderAlert() {
    if (this.props.errorMessage) {
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
					<div className="panel sign-up-panel">
						<div className="panel-heading">
							<h3 className="panel-title">Sign Up</h3>
						</div>
						<div className="panel-body sign-up">
							<form onSubmit={handleSubmit(this.handleFormSubmit)}>
								<div className="col-lg-12">
									<Field name="email" component={renderField} type="email" label="E-Mail"/>
									<Field name="password" component={renderField} type="password" label="Password" />
									<Field name="passwordConfirm" component={renderField} type="password" label="Confirm Password"/>
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

  if (!values.passwordConfirm) {
    errors.passwordConfirm = 'Please enter a password confirmation';
  }

  if (values.password !== values.passwordConfirm) {
    errors.password = 'Passwords must match';
  }
  return errors;
};

SignupPage.propTypes = {
	handleSubmit: React.PropTypes.func.isRequired,
	submitting: React.PropTypes.bool.isRequired,
	pristine: React.PropTypes.bool.isRequired,
	userSignup: React.PropTypes.func.isRequired,
	errorMessage: React.PropTypes.string,
};

function mapStateToProps(state) {
  return { errorMessage: state.auth.error };
}

export default connect(null)(connectDataFetchers(reduxForm({
														form: 'signup',
														validate,                // <--- validation function given to redux-form
													})(SignupPage), [ loadCategories, getDevice ]));
