import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Modal from 'react-modal';

import { NavBar } from '../components/header/NavBar';
import { navData } from '../Data/RouteData';
import * as authActions from '../actions/authAction';
import * as modalActions from '../actions/modalAction';
import  {renderField} from "./Shared/renderReduxForm";
import  SignInModal from "./SignInModal";

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
let Root = class Root extends React.Component{
	constructor(props) {
		super(props);
		this.logout = this.logout.bind(this);
		this.signin = this.signin.bind(this);
		this.goToSignUp = this.goToSignUp.bind(this);
		this.getUser = this.getUser.bind(this);
		this.loadScript = this.loadScript.bind(this);
		this.getGoogleAuth2 = this.getGoogleAuth2.bind(this);
	}
	handleFormSubmit(values) {
		// Call action creator to sign up the user!
		let {email, password} = values;
		this.props.userSignin({email, password});
	}
	goToSignUp(values) {
		this.props.router.push('/signup');
	}
	loadScript(src) {
		return new Promise(function (resolve, reject) {
			let s;
			s = document.createElement('script');
			s.src = src;
			s.onload = resolve;
			s.onerror = reject;
			document.head.appendChild(s);
		});
	}
	getGoogleAuth2(){
		return this.googleAuth2;
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

		// Load the FB SDK asynchronously
		this.loadScript("https://connect.facebook.net/en_US/sdk.js")
		.then(()=>{
			FB.init({
				appId      : '250001685455881',
				xfbml      : true,  // parse social plugins on this page
				version    : 'v2.8', // use version 2.8
			});
		});

		// Load the google api asynchronously
		this.loadScript("https://apis.google.com/js/api:client.js")
		.then(()=>{
			gapi.load('auth2', () => {
			// Retrieve the singleton for the GoogleAuth library and set up the client.
				this.googleAuth2 = gapi.auth2.init({
					client_id: '586155954929-m97mht8fe5sm5ua26pjbu3bkij22p8i0.apps.googleusercontent.com',
					cookiepolicy: 'single_host_origin',
					// Request scopes in addition to 'profile' and 'email'
					//scope: 'additional_scope'
				});
			});	
		});
	}
	logout(){
		this.props.userSignOut(this.props.routes);
	}
	signin(){
		let {auth} = this.props;
		if (auth && auth.success){
			return this.props.router.push(`/user`);
		}
			
		this.props.changeModal({open:true});
	}	
	getUser(){
		let { auth} = this.props;
		if (!auth ||! auth.success || !auth.user)	return <div/>;

		let User = undefined || (auth.user.email && <div className="login-user">{auth.user.email}</div>);
		User = User || (auth.user.profile && auth.user.profile.username && <div className="login-user">{auth.user.profile.username}</div>);
		return User;
	}
	render() {
		let { auth, showSigninModal} = this.props;
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
							<i className="fa fa-sign-out signin-icon" aria-hidden="true" onClick={this.logout}/>							
							<Link to="/signup"><i className="fa fa-user-plus signin-icon" aria-hidden="true"/></Link>
							<i className="fa fa-user signin-icon" aria-hidden="true" onClick={this.signin} />
							{this.getUser()}
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
			<SignInModal getGoogleAuth2={this.getGoogleAuth2}/>
		</Modal>
	</div>

		);
	}
};

Root.propTypes = {
	userSignOut: React.PropTypes.func.isRequired,
	userSignin: React.PropTypes.func.isRequired,
	showSigninModal: React.PropTypes.bool.isRequired,
	changeModal: React.PropTypes.func.isRequired,
	auth: React.PropTypes.object.isRequired,
	router: React.PropTypes.object.isRequired,
	routes: React.PropTypes.array.isRequired,
    children: React.PropTypes.oneOfType([
      React.PropTypes.arrayOf(React.PropTypes.node),
      React.PropTypes.node
    ])	
};

function mapStateToProps(state) {
  return { 
    auth: state.auth,
	showSigninModal: state.modal.open,	
  };
}	

Root = connect(mapStateToProps, { ...modalActions, ...authActions})(Root);

export { Root, NotFoundPage, UnauthorizedPage};
