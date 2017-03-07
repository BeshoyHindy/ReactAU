import React from 'react';
import { Router, Route, IndexRoute, IndexLink, browserHistory } from 'react-router';

import HomePage from '../components/HomePage';
import SignupPage from '../components/SignupPage';
import SigninPage from '../components/SigninPage';
import UserPage from '../components/UserPage';
import AboutPage from '../components/AboutPage';
import ContactPage from '../components/ContactPage';
import ProductCategorySidebar from '../components/Products/Sidebar/ProductCategorySidebar';
import ProductIndexSidebar from '../components/Products/Sidebar/ProductIndexSidebar';
import ProductsPage from '../components/ProductsPage';
import ProductCategory from '../components/Products/ProductCategory';
import ProductsTblPage from '../components/Products/ProductsTblPage';
import DetailsPage from '../components/Products/DetailsPage';

import AdminPage from '../components/AdminPage';
import AdminEditProductPage from '../components/Admin/AdminEditProductPage';
import AdminListProductPage from '../components/Admin/AdminListProductPage';
import AddUserPage from '../components/Admin/AddUserPage';


import Root from '../components/index';
import NotFoundPage from '../components/NotFoundPage';
import UnauthorizedPage from '../components/UnauthorizedPage';
//https://github.com/reactjs/react-router-redux/issues/179

const Routes = (props) => {
	let { history} = props;
	return (
	<Router history={history}>
		<Route path="/" component={Root}>
			<IndexRoute component={HomePage}/>
			<Route path="home" authorize={['reAuth']} component={HomePage} onEnter={props.hideXsNav} />
			<Route path="signin" component={SigninPage} onEnter={props.hideXsNav} />
			<Route path="signup" component={SignupPage} onEnter={props.hideXsNav} />
			<Route path="user" authorize={['normal']} component={UserPage} onEnter={props.hideXsNav} />
			<Route path="products" authorize={['reAuth']} component={ProductsPage} >
				<Route path=":product" components={{ content: ProductCategory, sidebar: ProductCategorySidebar }} onEnter={props.hideXsNav} >
					<Route path="spec/:id" component={DetailsPage} onEnter={props.hideXsNav} />
					<Route path=":ProductsTbl" component={ProductsTblPage} onEnter={props.hideXsNav} />
				</Route>
			</Route>
			<Route path="aboutus" authorize={['reAuth']} component={AboutPage} onEnter={props.hideXsNav} />
			<Route path="contact" authorize={['reAuth']} component={ContactPage} onEnter={props.hideXsNav} />
			<Route path="admin" authorize={['normal','admin']} component={AdminPage} onEnter={props.hideXsNav} >				
				<Route path="productChange/:id" component={AdminEditProductPage} onEnter={props.hideXsNav} />
				<Route path="productList/:cat" component={AdminListProductPage} onEnter={props.hideXsNav} />					
				<Route path="addUser" component={AddUserPage} onEnter={props.hideXsNav} />					
			</Route>
			<Route path="unauthorized" component={UnauthorizedPage} />
			<Route path="*" component={NotFoundPage} />
		</Route>
		<Route path="*" component={NotFoundPage} />
	</Router>);
};
Routes.propTypes = {
	// store: React.PropTypes.object.isRequired,
	history: React.PropTypes.object.isRequired,
	hideXsNav: React.PropTypes.func.isRequired
};


export default Routes;
