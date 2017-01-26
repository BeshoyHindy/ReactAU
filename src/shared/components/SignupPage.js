import { connect, bindActionCreators } from 'react-redux';
import React from 'react';
import {  Field, reduxForm } from 'redux-form';

import * as actions from '../actions/authAction';
import connectDataFetchers from '../lib/connectDataFetchers.jsx';
import { loadCategories } from '../actions/adminActions';
import { Breadcrumb } from "./Shared/Shared";

const renderField = ({ input, label, type, meta: { touched, error, warning } }) => (
  <div>
    <label>{label}</label>
    <div>
      <input {...input} placeholder={label} type={type} className="form-control"/>
      {touched && ((error && <span className="error">{error}</span>) || (warning && <span className="warning">{warning}</span>))}
    </div>
  </div>
)

class SignupPage extends React.Component {
	constructor(props) {
		super(props);
		this.handleFormSubmit = this.handleFormSubmit.bind(this);
		this.renderAlert = this.renderAlert.bind(this);
	}	
  handleFormSubmit(values) {
    // Call action creator to sign up the user!
		let {email, password} = values;
		this.props.dispatch(actions.userSignup({email, password}));
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
				<Breadcrumb linkPair={[{link:"user", desc:"User"},{link:"signup", desc:"Sign Up"}]}/>
				<div className="well">
					<div className="panel panel-danger sign-up-panel">
						<div className="panel-heading">
							<h3 className="panel-title">Sign Up</h3>
						</div>
						<div className="panel-body sign-up">
							<form onSubmit={handleSubmit(this.handleFormSubmit)}>
	  							<Field name="email" component={renderField} type="email" label="E-Mail"/>
									<Field name="password" component={renderField} type="password" label="Password" />
									<Field name="passwordConfirm" component={renderField} type="password" label="Confirm Password"/>
									{this.renderAlert()}
								<div>
									<button type="submit" disabled={pristine || submitting} className="btn btn-warning submit-btn">Submit</button>
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
  return errors
}

SignupPage.propTypes = {
};

function mapStateToProps(state) {
  return { errorMessage: state.auth.error };
}


SignupPage = reduxForm({
  form: 'signup',
  validate,                // <--- validation function given to redux-form
}, mapStateToProps )(SignupPage);


export default SignupPage = connect(mapStateToProps, actions)(SignupPage);
