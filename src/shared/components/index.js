import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { NavBar } from '../components/header/NavBar';
import { navData } from '../Data/RouteData';
import * as actions from '../actions/authAction';

class Root extends React.Component{
	constructor(props) {
		super(props);
		this.logout = this.logout.bind(this);
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
	logout(){
		this.props.userSignOut();
	}
	render() {
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
							<Link to="/signin"><i className="fa fa-user signin-icon" aria-hidden="true" ></i></Link>
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
	</div>

		);
	}
}

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
	
Root = connect(null, actions)(Root);

export { Root, NotFoundPage, UnauthorizedPage};