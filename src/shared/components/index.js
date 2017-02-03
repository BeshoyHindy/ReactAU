import Modal from 'react-modal';
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import {  Field, reduxForm } from 'redux-form';

import { NavBar } from '../components/header/NavBar';
import { navData } from '../Data/RouteData';
import * as authActions from '../actions/authAction';
import * as modalActions from '../actions/modalAction';
import  {renderField} from "./Shared/renderReduxForm";

const NotFoundPage = (props) 	=> (
		<div className="row">
			<div className="col-xs-12">
				<h1 className="center-page"> Page Not Found </h1>
			</div>
		</div>
	);

const UnauthorizedPage = (props) 	=> (
		<div className="row">
			<div className="col-xs-12">
				<h1 className="center-page"> Unauthorized </h1>
			</div>
		</div>
	);
class Root extends React.Component{
	constructor(props) {
		super(props);
		this.logout = this.logout.bind(this);
		this.signin = this.signin.bind(this);
		this.handleOpenModal = this.handleOpenModal.bind(this);
		this.handleCloseModal = this.handleCloseModal.bind(this);
		this.handleFormSubmit = this.handleFormSubmit.bind(this);
		this.renderAlert = this.renderAlert.bind(this);
		this.goToSignUp = this.goToSignUp.bind(this);
	}
  
	handleOpenModal () {
		// this.setState({ showModal: true });
		this.props.changeModal({open:true});
	}
	
	handleCloseModal () {
		// this.setState({ showModal: false });
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

	componentDidMount() {
		let cx = '010537077688859157203:be4kn89v_sy';
		let gcse = document.createElement('script');
		gcse.type = 'text/javascript';
		gcse.async = true;
		gcse.src = (document.location.protocol == 'https:' ? 'https:' : 'http:') +
				'//cse.google.com/cse.js?cx=' + cx;
		document.getElementById("search").appendChild(gcse);
		let gcsecc = document.createElement("gcse:search");
		gcsecc.innerHTML = "";
		document.getElementById("search").appendChild(gcsecc);
	}
	componentWillReceiveProps(nextProps) {
		if (nextProps !== this.props && this.props.auth && !this.props.auth.success && nextProps.auth && nextProps.auth.success){
			this.handleCloseModal();
		}
	}	
	logout(){
		this.props.userSignOut(this.props.routes);
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
	signin(){
		let {auth} = this.props;
		if (auth && auth.success){
			return this.props.router.push(`/user`);
		}
			
		this.handleOpenModal();
	}	
	render() {
		let {stars, auth, handleSubmit, pristine, submitting, showSigninModal } = this.props;
		return (
	<div>
		<header id="header">
			<div className="container">
				<div className="banner">
						<Link to="/home"> <h1><b>Hi-Tech</b> <span style={{ fontWeight: 500 }} > Digital CCTV</span></h1></Link>
						<p>
							for all your residential, commercial and industrial needs. {"\u00a0"}<i className="fa fa-phone"/> {"\u00a0"} 02 9725 7733
						</p>
						<div className="signin">
							<i className="fa fa-sign-out signin-icon" aria-hidden="true" onClick={this.logout}></i>							
							<Link to="/signup"><i className="fa fa-user-plus signin-icon" aria-hidden="true"></i></Link>
							<i className="fa fa-user signin-icon" aria-hidden="true" onClick={this.signin} />
							{auth && auth.success && auth.user.email && <div className="login-user">{auth.user.email}</div>} 
						</div>
						<span id="BTN" className="bar"><i className="fa fa-bars"/></span>
						<div id="search" className="search"/>
				</div>
				<div className="myheader"/>
				<NavBar data={navData} activeClass="active"/>
			</div>
		</header>
		<div id="article">
			<div className="container">
				{this.props.children}
			</div>
		</div>
		<div id="footer"/>
		<Modal isOpen={showSigninModal} contentLabel="Modal" className="Modal login-modal"  overlayClassName="Overlay"> 					
			<form onSubmit={handleSubmit(this.handleFormSubmit)}>
				<h3 className="modal-title">Sign In</h3>
				<div className="col-lg-12">
					<Field name="email" component={renderField} type="email" label="E-Mail"/>
					<Field name="password" component={renderField} type="password" label="Password" />
				</div>
				<div className="col-lg-12">
					{this.renderAlert()}
					<hr/>
					<div>
						<button type="submit" disabled={pristine || submitting} className="btn btn-warning submit-btn pull-right">Submit</button>
						<button type="button" onClick={this.handleCloseModal} className="btn btn-warning  pull-right close-modal">Close</button>
					</div>
				</div>
			</form>
		</Modal>		
	</div>

		);
	}
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

	return errors;
}

function mapStateToProps(state) {
  return { 
	showSigninModal: state.modal.open,
    auth: state.auth,
	errorMessage: state.auth.error,
	path: (state.routing && state.routing.locationBeforeTransitions && state.routing.locationBeforeTransitions.pathname ) || 'serversiding-rendering'	
  };
}	


Root = reduxForm({
  form: 'signinModal',
  validate,                // <--- validation function given to redux-form
} )(Root);


Root = connect(mapStateToProps, {...modalActions, ...authActions})(Root);

export { Root, NotFoundPage, UnauthorizedPage};
