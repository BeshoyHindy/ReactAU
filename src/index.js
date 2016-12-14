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
import {ProductsTbl} from './components/Products/ProductsTbl';


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

class CategorySidebar extends React.Component{
		constructor(props) {
			super(props);
			this.state = {
				products:[],
				selected:''
			};
		}

		componentDidUpdate (prevProps, prevState) {

			let oldId = prevProps.params.product;
			let newId = this.props.params.product;
			let oldTblId = prevProps.params.ProductsTbl;
			let newTblId = this.props.params.ProductsTbl;

			if (oldTblId && newTblId !== oldTblId)
				this.setState({selected  : this.props.params.ProductsTbl});

			if (oldId && newId !== oldId)
				this.fetchData();
		}
		componentWillMount() {
			this.fetchData();
		}

		fetchData(){
			//console.log('this.props.params: ', this.props.params);
			let cat = this.props.params.product || 'DVR';
			axios({
				method: 'get',
				url: '/json/'+cat+'.json',
				dataType: 'JSON'
			})
			.then( (response) => {
				this.setState({
					products: response.data
				});
			})
			.catch(function (error) {
				console.log(error);
			});
		}
  isActive(value){
    return ((value===this.state.selected) ?'active':'');
  }
		render() {
			let uniqArray = (arrArg) => arrArg.filter((elem, pos, arr) => arr.indexOf(elem) == pos);
			let brands = uniqArray(this.state.products.map((item, index) => (item.brand)));
			let type = uniqArray(this.state.products.map((item, index) => (item.type)));
			return (
				<div>
					<div className="col-sm-12 cat">
						<ul ><li>Brand:
									<ul>
										<li className={this.isActive( 'All' )}><Link to={`/products/${this.props.params.product}/All`}>All</Link></li>
										{
											brands.map((item, index) => (
												<li key={index}  className={this.isActive( item )}>
													<Link to={`/products/${this.props.params.product}/${item}`}> {item} </Link>
												</li>
											))
										}
									</ul>
								</li>
								<li>System:
									<ul>
										<li className={this.isActive( 'All' )}><Link to={`/products/${this.props.params.product}/All`} >All</Link></li>
										{
											type.map((item, index) => (
												<li key={index}  className={this.isActive( item )}>
													<Link to={`/products/${this.props.params.product}/${item}`}> {item} </Link>
												</li>
											))
										}
									</ul>
								</li>
							</ul>
					</div>
				</div>
			);
		}

}
const Index = () => (
	<div>
		<h1 className="page-header">DVR
			<small>Lorem ipsum dolor sit amet</small>
		</h1>
		<p>
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
		</p>

		<h1 className="page-header">Kit
			<small>Lorem ipsum dolor sit amet</small>
		</h1>
		<p>
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
		</p>

		<h1 className="page-header">CCTV Camera
			<small>Lorem ipsum dolor sit amet</small>
		</h1>
		<p>
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
		</p>

		<h1 className="page-header">Instrusion Alarm
			<small>Lorem ipsum dolor sit amet</small>
		</h1>
		<p>
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
		</p>

		<h1 className="page-header">Video Intercom
			<small>Lorem ipsum dolor sit amet</small>
		</h1>
		<p>
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
		</p>
	</div>
);

const IndexSidebar = () => (
<div>
					<div className="col-sm-12 cat">
						<ul ><li>Products:
									<ul>
										<li><Link to="/products/DVR/ALL">DVR</Link></li>
										<li><Link to="/products/KIT/ALL">Kit</Link></li>
										<li><Link to="/products/NVR/ALL">NVR</Link></li>
										<li><Link to="/products/CCTV/ALL">CCTV Camera</Link></li>
										<li><Link to="/products/ALARM/ALL">Instrusion Alarm</Link></li>
										<li><Link to="/products/INTERCOM/ALL">Video Intercom</Link></li>
									</ul>
								</li>
							</ul>
					</div>
				</div>
);

const Products = ({ content, sidebar }) => (
	<div>
		<div className="row">
				<div className="col-md-3 col-lg-2 hidden-sm hidden-xs sidebar">
						{sidebar || <IndexSidebar />}
				</div>

				<div className="col-md-9 col-lg-10 roghtcontent">
						{content || <Index />}
				</div>
		</div>
	</div>
);

const Category = (props) => {
		return (
			<div> {React.cloneElement(props.children, props)} </div>
		)
};

render((
	<Router history={browserHistory}>
		<Route path="/" component={Root}>
			<IndexRoute component={Home}/>
			<Route path="home" component={Home} />
			<Route path="products" component={Products}>
				<Route path=":product" components={{ content: Category, sidebar: CategorySidebar }}>
					<Route path=":ProductsTbl" component={ProductsTbl} />
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
