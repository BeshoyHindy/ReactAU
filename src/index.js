require('./sass/main.scss');
require("font-awesome-sass-loader");
require.context('./img', true, /\.?/);
require.context('./json', true, /\.?/);
require.context('./fonts', true, /\.?/);


import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, Link, IndexLink, browserHistory } from 'react-router';
import axios from 'axios';

import {Home} from './components/Home';
import {About} from './components/About';
import {Contact} from './components/Contact';
import {ProductCategorySidebar, ProductIndexSidebar} from './components/Products/CategorySidebar';
import {ProductCategory, Products} from './components/Products/Products';
import {ProductsTbl} from './components/Products/ProductsTbl';
import { Details } from './components/Products/Detail';
import { NavBar } from './components/header/NavBar';
import { navData } from './Data/RouteData';


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
						<p>for all your residential, commercial and industrial needs. {"\u00a0"}<i className="fa fa-phone"></i> {"\u00a0"} 02 9725 7733</p>
						<span id="BTN" className="bar"><i className="fa fa-bars"></i></span>
						<div id="search" className="search">

						</div>
				</div>
				<div className="myheader"></div>
				<NavBar data={navData} activeClass="active"/>
			</div>
		</header>
		<div id="article">
			{this.props.children}
		</div>
		<div id="footer"></div>
	</div>

		);
	}
}

const NotFoundPage = (props) => (	<h1> Page Not Found </h1>);

render((
	<Router history={browserHistory}>
		<Route path="/" component={Root}>
			<IndexRoute component={Home}/>
			<Route path="home" component={Home} />
			<Route path="products" component={Products}>
				<Route path=":product" components={{ content: ProductCategory, sidebar: ProductCategorySidebar }}>
					<Route path="spec/:id" component={Details} />
					<Route path=":ProductsTbl" component={ProductsTbl} >
					</Route>
				</Route>
			</Route>
			<Route path="aboutus" component={About} />
			<Route path="contact" component={Contact} />
		</Route>
		<Route path="*" component={NotFoundPage} />
	</Router>
), document.getElementById("rootWrap"));

if(module.hot){
		module.hot.accept();
}
