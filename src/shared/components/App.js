if (process.env.BROWSER) {
	require ('../Sass/global.scss');
}


import {RouteWithSubRoutes} from '../route/util';
import React from 'react';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import { ShareButtons, generateShareIcon} from 'react-share';
import { Route, Link } from 'react-router-dom';

import  Footer from "./Footer";
import  NavBar  from './header/NavBar';
import FunctionalBar from './header/FunctionalBar';

import routes from '../route/index';

let Root = class Root extends React.Component{
	constructor(props) {
		super(props);
		this.state = {showSmNav:false};
		this.loadScript = this.loadScript.bind(this);
		this.getGoogleAuth2 = this.getGoogleAuth2.bind(this);
		this.SmNavCtrl = this.SmNavCtrl.bind(this);
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
	SmNavCtrl(ctrl){
		this.setState({showSmNav: ctrl});
	}	
	render() {
		return (
		<div>
			<header id="header">
				<div className="container">
					<FunctionalBar getGoogleAuth2={this.getGoogleAuth2} SmNavCtrl={this.SmNavCtrl}/>
					<div className="myheader"/>
					<NavBar activeClass="active" SmNavCtrl={this.SmNavCtrl} showSmNav={this.state.showSmNav}/>
				</div>
			</header>
			<div id="article">			
				{
					routes.map((route, id) => {
						return (<RouteWithSubRoutes key={route.path + 0} route={route} {...this.props} />);
					}
				)}
			</div>
			<Footer/>
		</div>
		);
	}
};



export default Root;
