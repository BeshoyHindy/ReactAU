if (process.env.BROWSER) {
	require("font-awesome.css");
	require("bootstrap.css");	
	require ('./global.scss');
}


import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Modal from 'react-modal';
import { ShareButtons, generateShareIcon} from 'react-share';

import connectDataFetchers from '../lib/connectDataFetchers.jsx';
import { loadCategories } from '../actions/adminActions';

import { NavBar } from '../components/header/NavBar';
import * as authActions from '../actions/authAction';
import * as modalActions from '../actions/modalAction';
import  {renderField} from "./Shared/renderReduxForm";
import  SignInModal from "./SignInModal";
import  Footer from "./Footer";
import { getDevice } from '../actions/deviceAction';

const {
  FacebookShareButton,
  GooglePlusShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  PinterestShareButton,
  VKShareButton
} = ShareButtons;

const FacebookIcon = generateShareIcon('facebook');
const TwitterIcon = generateShareIcon('twitter');
const GooglePlusIcon = generateShareIcon('google');
const LinkedinIcon = generateShareIcon('linkedin');
const PinterestIcon = generateShareIcon('pinterest');



let Root = class Root extends React.Component{
	constructor(props) {
		super(props);
		this.state={
			showSmNav: false
		};
		this.logout = this.logout.bind(this);
		this.signin = this.signin.bind(this);
		this.goToSignUp = this.goToSignUp.bind(this);
		this.getUser = this.getUser.bind(this);
		this.loadScript = this.loadScript.bind(this);
		this.getGoogleAuth2 = this.getGoogleAuth2.bind(this);
		this.showXsNav = this.showXsNav.bind(this);
	}
	handleFormSubmit(values) {
		// Call action creator to sign up the user!
		let {email, password} = values;
		this.props.dispatch(authActions.userSignin({email, password}));
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
		//google custom search
		let cx = '010537077688859157203:awis0lislbk';
		let gcse = document.createElement('script');
		gcse.type = 'text/javascript';
		gcse.async = true;
		gcse.src = (document.location.protocol == 'https:' ? 'https:' : 'http:') +
				'//cse.google.com/cse.js?cx=' + cx;
		document.getElementById("search").appendChild(gcse);
		let gcsecc = document.createElement("gcse:search");
		gcsecc.innerHTML = "";
		document.getElementById("search").appendChild(gcsecc);


		//GA
		(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
		(i[r].q=i[r].q||[]).push(arguments);},i[r].l=1*new Date();a=s.createElement(o),
		m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m);
		})(window,document,'script','/local-ga.js','ga');
		ga('create', 'UA-50969260-2', 'auto');
		ga('send', 'pageview');
		// this.loadScript("https://cdn.jsdelivr.net/ga-lite/latest/ga-lite.min.js")
		// .then(()=>{
		// 	let galite = galite || {}; galite.UA = 'UA-50969260-2';
		// });


		//Google Web fonts
		this.loadScript("https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js")
		.then(()=>{
			WebFont.load({
				google: {
					families: [ 'Lato' , 'Oswald:400,600' , 'Rajdhani:300,400,500', 'Ubuntu:300,400']
				}
			});
		});	


		// Load the FB SDK asynchronously
		this.loadScript("https://connect.facebook.net/en_US/sdk.js")
		.then(()=>{
			window.FB.init({
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
		this.props.dispatch(authActions.userSignOut(this.props.routes));
	}
	signin(){
		let {auth} = this.props;
		if (auth && auth.success){
			return this.props.router.push(`/user`);
		}
			
		this.props.dispatch(modalActions.changeModal(true));
	}	
	getUser(){
		let { auth} = this.props;
		if (!auth ||! auth.success || !auth.user)	return <div/>;

		let User = undefined || (auth.user.email && <div className="login-user">{auth.user.email}</div>);
		User = User || (auth.user.profile && auth.user.profile.username && <div className="login-user">{auth.user.profile.username}</div>);
		return User;
	}
	showXsNav(){
		this.props.dispatch(modalActions.changeXsNavModal(true));
	}
	render() {
		let { auth, showSigninModal} = this.props;
		let Baselink = "https://react-redux-demo-chingching.herokuapp.com";
		let link = Baselink;
		this.props.location.pathname && (link = Baselink + this.props.location.pathname);
		// console.log(link, this.props.location.pathname);
		return (
	<div>
		<header id="header">
			<div className="container">
				<div className="banner">
						<Link to="/home"> <h1><b>Hi-Tech</b> <span > Digital CCTV</span></h1></Link>
						<p>
							for all your residential, commercial and industrial needs. {"\u00a0"}<i className="fa fa-phone"/> {"\u00a0"} 02 9725 7733
						</p>
						<div className="signin">
							{this.getUser()}
							<FacebookShareButton url={link} className="social-share"> <FacebookIcon size={28} round={true} /> </FacebookShareButton>
							<GooglePlusShareButton url={link} className="social-share"> <GooglePlusIcon size={28} round={true} /> </GooglePlusShareButton>
							<LinkedinShareButton url={link} className="social-share"> <LinkedinIcon size={28} round={true} /> </LinkedinShareButton>
							<TwitterShareButton url={link} className="social-share"> <TwitterIcon size={28} round={true} /> </TwitterShareButton>
							<i className="fa fa-user signin-icon" aria-hidden="true" onClick={this.signin} />
							<Link to="/signup"><i className="fa fa-user-plus signin-icon" aria-hidden="true"/></Link>
							<i className="fa fa-sign-out signin-icon" aria-hidden="true" onClick={this.logout}/>							
						</div>
						<span id="BTN" className="bar" onClick={this.showXsNav}><i className="fa fa-bars"/></span>
						<div id="search" className="search"/>
				</div>
				<div className="myheader"/>
				<NavBar activeClass="active"/>
			</div>
		</header>
		<div id="article">			
			{this.props.children}
		</div>
		<Footer/>
		<Modal isOpen={showSigninModal} contentLabel="Modal" className="Modal login-modal"  overlayClassName="Overlay"> 
			<SignInModal getGoogleAuth2={this.getGoogleAuth2}/>
		</Modal>
	</div>

		);
	}
};

Root.propTypes = {
	showSigninModal: React.PropTypes.bool.isRequired,
	dispatch: React.PropTypes.func.isRequired,
	auth: React.PropTypes.object.isRequired,
	router: React.PropTypes.object.isRequired,
	location: React.PropTypes.object.isRequired,
	routes: React.PropTypes.array.isRequired,
    children: React.PropTypes.oneOfType([
      React.PropTypes.arrayOf(React.PropTypes.node),
      React.PropTypes.node
    ])	
};

function mapStateToProps(state) {
	
  return { 
    auth: state.auth,
	showSigninModal: state.modal.showModal,	
  };
}	

Root = connect(mapStateToProps)(connectDataFetchers(Root, [ loadCategories, getDevice ]));

export default Root;
