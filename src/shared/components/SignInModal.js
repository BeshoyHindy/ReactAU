
import React from 'react';
import { connect } from 'react-redux';
import jsonp from 'jsonp';
import { Link } from 'react-router';
import {  Field, reduxForm } from 'redux-form';

import { api_server } from '../../../.config/configuration';
import * as authActions from '../actions/authAction';
import * as modalActions from '../actions/modalAction';
import  {renderField} from "./Shared/renderReduxForm";

let SignInModal = class SignInModal extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			authType: "email/password",
			socialErsMsg: "",
		};
		this.handleOpenModal = this.handleOpenModal.bind(this);
		this.handleCloseModal = this.handleCloseModal.bind(this);
		this.handleFormSubmit = this.handleFormSubmit.bind(this);
		this.renderAlert = this.renderAlert.bind(this);
		this.goToSignUp = this.goToSignUp.bind(this);
		this.fbLogin = this.fbLogin.bind(this);
		this.googleLogin = this.googleLogin.bind(this);
		this.handleGoogleLogin = this.handleGoogleLogin.bind(this);
		this.handleFbLogin = this.handleFbLogin.bind(this);
		this.setcusGoogleBtn = this.setcusGoogleBtn.bind(this);
	}
	componentDidMount() {
		this.googleLogin();	
	}
	handleOpenModal () {
		this.props.changeModal({open:true});
	}
	handleCloseModal () {
		this.props.changeModal({open:false});
	}
	handleFormSubmit(values) {
		// Call action creator to sign up the user!
		let {email, password} = values;
		this.props.userSignin({email, password},this.props.pathname);
	}
	goToSignUp(values) {
		this.props.router && this.props.router.push('/signup');
	}
	componentWillReceiveProps(nextProps) {
		if (nextProps !== this.props && this.props.auth && !this.props.auth.success && nextProps.auth && nextProps.auth.success){
			this.handleCloseModal();
		}
	}
	googleLogin() {
		if (this.googleAuth2){
			return;
		}
		this.googleAuth2 = this.props.getGoogleAuth2();
		this.googleAuth2.attachClickHandler(this.customGoogleBtn, {}, this.handleGoogleLogin, function(error) {
				alert(JSON.stringify(error, undefined, 2)
			);
		});		
	}	
	fbLogin(){
		FB.login( this.handleFbLogin, {
			scope: 'email', 
			return_scopes: true
		});

		//Manual Login
		//http://stackoverflow.com/questions/9793373/how-to-open-facebook-login-dialog-in-the-same-window-instead-of-popup-window
		//https://developers.facebook.com/docs/facebook-login/manually-build-a-login-flow

		//sdk docs		
		//https://developers.facebook.com/docs/reference/javascript/FB.login/v2.8
	}
	handleFbLogin(response){
		if (response.authResponse) {
			if (status === 'not_authorized'){
				return this.setState((state, props) => { return { socialErsMsg: "Unauthorized" };});				
			}
			if (status === 'unknown'){
				return this.setState((state, props) => { return { socialErsMsg: "Loading..." };});				
			}
			let {accessToken, userID} = response.authResponse;
			this.props.userSocialLoginClient({type: "facebook", token: accessToken, id: userID});
		} else {
			this.setState((state, props) => { return { socialErsMsg: "For FB Login, You need to not fully authorize" };});				
		}
	}
	handleGoogleLogin(googleUser) {
		//https://developers.google.com/identity/sign-in/web/
		let profile = googleUser.getBasicProfile();
		let id_token = googleUser.getAuthResponse().id_token;
		this.props.userSocialLoginClient({type: "google", token: id_token, id: profile.getId()});
	}	
	renderAlert() {
		if (this.props.auth.error || this.state.socialErsMsg) {
			return (
				<div className="alert alert-danger">
				<strong>Oops!</strong> { this.props.errorMessage || this.state.socialErsMsg} !!
				</div>
			);
		}
	}
	setcusGoogleBtn(ref){this.customGoogleBtn = ref;}
	render() {
		let {auth, handleSubmit, pristine, submitting, showSigninModal } = this.props;
		return (
			<form onSubmit={handleSubmit(this.handleFormSubmit)}>
				<h3 className="modal-title">Sign In</h3>
				<div className="col-lg-12">
					<Field name="email" component={renderField} type="email" label="E-Mail"/>
					<Field name="password" component={renderField} type="password" label="Password" />
				</div>
				<div className="col-lg-12">
				<div className="social-login">
					<lable className="social-label"> Sign In with Social Account</lable>	
					<i className="fa fa-facebook-square btn-social btn-facebook" aria-hidden="true" onClick={this.fbLogin} />	
					<i className="fa fa-google-plus-square btn-social btn-google" id="customGoogleBtn" aria-hidden="true" 
						ref={this.setcusGoogleBtn} onClick={this.googleLogin} />	
				</div>
					{this.renderAlert()}
					<div>
						<button type="submit" disabled={pristine || submitting} className="btn btn-warning submit-btn pull-right close-modal">Submit</button>
						<button type="button" onClick={this.handleCloseModal} className="btn btn-warning  pull-right close-modal">Close</button>
					</div>
				</div>
			</form>
		);
	}
};

SignInModal.propTypes = {
	handleSubmit: React.PropTypes.func.isRequired,
	submitting: React.PropTypes.bool.isRequired,
	pristine: React.PropTypes.bool.isRequired,
	changeModal: React.PropTypes.func.isRequired,
	userSignin: React.PropTypes.func.isRequired,
	showSigninModal: React.PropTypes.bool.isRequired,
	errorMessage: React.PropTypes.string,	
	auth: React.PropTypes.object.isRequired,
	router: React.PropTypes.object,
	getGoogleAuth2: React.PropTypes.func.isRequired,
	userSocialLoginClient: React.PropTypes.func.isRequired,
    children: React.PropTypes.oneOfType([
      React.PropTypes.arrayOf(React.PropTypes.node),
      React.PropTypes.node
    ])	
};


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

function mapStateToProps(state) {
  return { 
    auth: state.auth,
	errorMessage: state.auth.error,
	showSigninModal: state.modal.open,
  };
}	


SignInModal = reduxForm({
  form: 'signinModal',
  validate,                // <--- validation function given to redux-form
} )(SignInModal);


SignInModal = connect(mapStateToProps, {...modalActions, ...authActions})(SignInModal);

export default SignInModal;
