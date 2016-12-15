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
				<div id="cctv-nav" className="cctv-nav">
					<ul>
						<h3 id="XX"> <i className="fa fa-times"></i></h3>
						<li><Link to="/home" activeClassName="active"> Home </Link>
						</li>
						<li><div className="parent"><Link to="/products" activeClassName="active">Products</Link><span className='caret'></span></div>
							<ul className="dropdown-menu">
								<li>
									<Link to="/products/DVR/All"> DVR <i className="fa fa-caret-right"/></Link>
									<ul className="dropdown-menu">
											<li ><Link to="/products/DVR/HD-SDI">HD-SDI</Link></li>
											<li ><Link to="/products/DVR/HD-TVI">HD-TVI</Link></li>
											<li ><Link to="/products/DVR/AHD">AHD</Link></li>
											<li ><Link to="/products/DVR/Analog">Analog</Link></li>
									</ul></li>
								<li>
									<Link to="/products/KIT/All"> Kit </Link>
								</li>
								<li>
									<Link to="/products/NVR/All"> NVR </Link>
								</li>
								<li>
									<Link to="/products/CCTV/All"> CCTV Camera <i className="fa fa-caret-right"/></Link>
									<ul className="dropdown-menu">
											<li ><Link to="/products/CCTV/HD-SDI">HD-SDI</Link></li>
											<li ><Link to="/products/CCTV/HD-TVI">HD-TVI</Link></li>
											<li ><Link to="/products/CCTV/AHD">AHD</Link></li>
											<li ><Link to="/products/CCTV/Analog">Analog</Link></li>
											<li ><Link to="/products/CCTV/IP">IP</Link></li>
									</ul>
								</li>
								<li><Link to="/products/ALARM/All"> Instrusion Alarm </Link></li>
								<li><Link to="/products/INTERCOM/All"> Video Intercom </Link></li>
							</ul>
						</li>
						<li>
							<Link to="/aboutus" activeClassName="active"> About Us </Link>
						</li>
						<li>
							<Link to="/contact" activeClassName="active">  Contact</Link>
						</li>
					</ul>
				</div>
			</div>
			<div className="myheader"></div>
		</header>
		<div id="article">
			<div className="row">
				{this.props.children}
			</div>
		</div>
		<div id="footer"></div>
</div>

		);
	}
}

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
	</Router>
), document.getElementById("rootWrap"));

if(module.hot){
		module.hot.accept();
}
