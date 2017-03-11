import React from 'react';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import { ShareButtons, generateShareIcon} from 'react-share';
import { Link } from 'react-router-dom';


import { NavBar } from './header/NavBar';
import * as authActions from '../actions/authAction';
import * as modalActions from '../actions/modalAction';
import  {renderField} from "./Shared/renderReduxForm";
import  SignInModal from "./SignInModal";


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



let Header = class Header extends React.Component{
	constructor(props) {
		super(props);
		this.state={
			showSmNav: false
		};
		this.logout = this.logout.bind(this);
		this.signin = this.signin.bind(this);
		this.goToSignUp = this.goToSignUp.bind(this);
		this.getUser = this.getUser.bind(this);
		this.showXsNav = this.showXsNav.bind(this);
	}
	goToSignUp(values) {
		this.props.router.push('/signup');
	}
	componentDidMount() {
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
		// this.props.location.pathname && (link = Baselink + this.props.location.pathname);
		// console.log(routes);
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
			<Modal isOpen={showSigninModal} contentLabel="Modal" className="Modal login-modal"  overlayClassName="Overlay"> 
				<SignInModal getGoogleAuth2={this.props.getGoogleAuth2}/>
			</Modal>
		</div>

		);
	}
};


Header.propTypes = {
	showSigninModal: React.PropTypes.bool.isRequired,
	dispatch: React.PropTypes.func.isRequired,
	auth: React.PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return { 
    auth: state.auth,
	showSigninModal: state.modal.showModal,	
  };
}

Header = connect(mapStateToProps)(Header);

export default Header;
