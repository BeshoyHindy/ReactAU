import React from 'react';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import { ShareButtons, generateShareIcon} from 'react-share';
import { Link } from 'react-router-dom';



import * as authActions from '../../actions/authAction';
import * as modalActions from '../../actions/modalAction';
import  {renderField} from "../Shared/renderReduxForm";
import  SignInModal from "../SignInModal";


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



let FunctionalBar = class FunctionalBar extends React.Component{
	constructor(props) {
		super(props);
		this.logout = this.logout.bind(this);
		this.signin = this.signin.bind(this);
		this.goToSignUp = this.goToSignUp.bind(this);
		this.getUser = this.getUser.bind(this);
		this.showXsNav = this.showXsNav.bind(this);
	}
	goToSignUp(values) {
		this.context.router.history.push('/signup');
	}
	componentDidMount() {
	}
	logout(){
		this.props.dispatch(authActions.userSignOut());
	}
	signin(){
		let {auth} = this.props;
		if (auth && auth.success){
			return this.context.router.history.push(`/user`);
		}
		this.props.dispatch(modalActions.changeModal(true));
	}
	getUser(){
		let { auth} = this.props;
		if (!auth ||! auth.success || !auth.user)	return <div/>;

		let User = (auth.user.email && <div className="login-user">{auth.user.email}</div>);
		User = User || (auth.user.profile && auth.user.profile.username && <div className="login-user">{auth.user.profile.username}</div>);
		return User;
	}
	showXsNav(){
		this.props.SmNavCtrl(true);
	}
	render() {
		let { auth, showSigninModal} = this.props;
		let Baselink = "https://react-redux-demo-chingching.herokuapp.com";
		let link = Baselink;
		// this.props.location.pathname && (link = Baselink + this.props.location.pathname);
		// console.log(routes);
		return (
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
				<Modal isOpen={showSigninModal} contentLabel="Modal" className="Modal login-modal"  overlayClassName="Overlay">
					<SignInModal getGoogleAuth2={this.props.getGoogleAuth2}/>
				</Modal>
			</div>
		);
	}
};


FunctionalBar.propTypes = {
	showSigninModal: React.PropTypes.bool.isRequired,
	dispatch: React.PropTypes.func.isRequired,
	getGoogleAuth2: React.PropTypes.func.isRequired,
	SmNavCtrl: React.PropTypes.func.isRequired,
	auth: React.PropTypes.object.isRequired,
};
FunctionalBar.contextTypes = {
	router: React.PropTypes.object
};
function mapStateToProps(state) {
  return {
    auth: state.auth,
	showSigninModal: state.modal.showModal,
  };
}

FunctionalBar = connect(mapStateToProps)(FunctionalBar);

export default FunctionalBar;
