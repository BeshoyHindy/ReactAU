import Modal from 'react-modal';
import React from 'react';
import { connect } from 'react-redux';
import jsonp from 'jsonp';
import { Link } from 'react-router';
import {  Field, reduxForm } from 'redux-form';

import { api_server } from '../../../.config/configuration';
import * as authActions from '../actions/authAction';
import * as modalActions from '../actions/modalAction';
import  {renderField} from "./Shared/renderReduxForm";

class SignInModal extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			authType: "email/password",
			socialErsMsg: "",
		}
		this.handleOpenModal = this.handleOpenModal.bind(this);
		this.handleCloseModal = this.handleCloseModal.bind(this);
		this.handleFormSubmit = this.handleFormSubmit.bind(this);
		this.renderAlert = this.renderAlert.bind(this);
		this.goToSignUp = this.goToSignUp.bind(this);
		this.fbLogin = this.fbLogin.bind(this);
		this.googleLogin = this.googleLogin.bind(this);
		this.handleFbLogin = this.handleFbLogin.bind(this);
	}
	componentDidMount() {
		window.fbAsyncInit = () => {
			FB.init({
				appId      : '250001685455881',
				xfbml      : true,  // parse social plugins on this page
				version    : 'v2.8', // use version 2.8
			});
		}

		// Load the SDK asynchronously
		(function(d, s, id) {
			var js, fjs = d.getElementsByTagName(s)[0];
			if (d.getElementById(id)) return;
			js = d.createElement(s); js.id = id;
			js.src = "https://connect.facebook.net/en_US/sdk.js";
			fjs.parentNode.insertBefore(js, fjs);
		}(document, 'script', 'facebook-jssdk'));		
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
		this.props.router.push('/signup');
	}
	componentWillReceiveProps(nextProps) {
		if (nextProps !== this.props && this.props.auth && !this.props.auth.success && nextProps.auth && nextProps.auth.success){
			this.handleCloseModal();
		}
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

		// the follow wil fail with: Refused to display 'https://www.facebook.com/connect/ping?client_id=250001685455881&domain=loca…4%26relation%3Dparent&response_type=token%2Csigned_request%2Ccode&sdk=joey' in a frame because it set 'X-Frame-Options' to 'DENY'.
		// FB.getLoginStatus(function(response) {
		// 	if (response.status === 'connected') {
		// 		// the user is logged in and has authenticated your
		// 		// app, and response.authResponse supplies
		// 		// the user's ID, a valid access token, a signed
		// 		// request, and the time the access token 
		// 		// and signed request each expire
		// 		var uid = response.authResponse.userID;
		// 		console.log('Welcome!  Fetching your information.... ', response);
		// 		console.log('Good to see you, ' + response.name + '.');
		// 	} else if (response.status === 'not_authorized') {
		// 		// the user is logged in to Facebook, 
		// 		// but has not authenticated your app
		// 	} else {
		// 		// the user isn't logged in to Facebook.
		// 	}
		// });

	}
	handleFbLogin(response){
		if (response.authResponse) {
			if (status === 'not_authorized'){
				return this.setState((state, props) => { return { socialErsMsg: "Unauthorized" }});				
			}
			if (status === 'unknown'){
				return this.setState((state, props) => { return { socialErsMsg: "Loading..." }});				
			}
			let {accessToken, userID} = response.authResponse;
			this.props.userSocialLoginClient({type: "facebook", token: accessToken, id: userID});
		} else {
			this.setState((state, props) => { return { socialErsMsg: "For FB Login, You need to not fully authorize" }});				
		}
	}
	googleLogin(){

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

	render() {
		let {auth, handleSubmit, pristine, submitting, showSigninModal } = this.props;
		return (
		<Modal isOpen={showSigninModal} contentLabel="Modal" className="Modal login-modal"  overlayClassName="Overlay"> 					
			<form onSubmit={handleSubmit(this.handleFormSubmit)}>
				<h3 className="modal-title">Sign In</h3>
				<div className="col-lg-12">
					<Field name="email" component={renderField} type="email" label="E-Mail"/>
					<Field name="password" component={renderField} type="password" label="Password" />
				</div>
				<div className="col-lg-12">
				<div className="social-login">
					<lable className="social-label"> Sign In with Social Account</lable>	
					<i className="fa fa-facebook-square btn-social btn-facebook" aria-hidden="true" onClick={this.fbLogin}></i>	
					<i className="fa fa-google-plus-square btn-social btn-google" aria-hidden="true" onClick={this.googleLogin}></i>	
				</div>
					{this.renderAlert()}
					<div>
						<button type="submit" disabled={pristine || submitting} className="btn btn-warning submit-btn pull-right close-modal">Submit</button>
						<button type="button" onClick={this.handleCloseModal} className="btn btn-warning  pull-right close-modal">Close</button>
					</div>
				</div>
			</form>
		</Modal>		
		);
	}
}


/*
					<a href={`${api_server.http.host}:${api_server.http.port}/auth/facebook`} target="_self"> 
						<i className="fa fa-facebook-square btn-social btn-facebook" aria-hidden="true" onClick={this.fbLogin}></i>	
					</a>
*/
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

	return errors;
}

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
