import React from 'react';
import { Link } from 'react-router';
import { NavBar } from '../components/header/NavBar';
import { navData } from '../Data/RouteData';

class Root extends React.Component{
		constructor(props) {
			super(props);
			this.state = {
			};
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

	render() {
		return (
	<div>
		<header id="header">
			<div className="container">
				<div className="banner">
						<Link to="/home"> <h1><b>Hi-Tech</b> <span style={{ fontWeight: 500 }} > Digital CCTV</span></h1></Link>
						<p>for all your residential, commercial and industrial needs. {"\u00a0"}<i className="fa fa-phone"/> {"\u00a0"} 02 9725 7733</p>
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

const NotFoundPage = (props) => (	<h1> Page Not Found </h1>);


export { Root, NotFoundPage};