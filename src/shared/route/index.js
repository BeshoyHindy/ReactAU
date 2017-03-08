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
//need to wrap as compnent to let HMR work
const Routes = (props) => {
	let { history, hideXsNav} = props;
	return (
	<Router history={history}>
		<Route path="/" component={Root}>
			<IndexRoute component={HomePage}/>
			<Route path="home" authorize={['reAuth']} component={HomePage} onEnter={hideXsNav} />
			<Route path="signin" component={SigninPage} onEnter={hideXsNav} />
			<Route path="signup" component={SignupPage} onEnter={hideXsNav} />
			<Route path="user" authorize={['normal']} component={UserPage} onEnter={hideXsNav} />
			<Route path="products" authorize={['reAuth']} component={ProductsPage} >
				<Route path=":product" components={{ content: ProductCategory, sidebar: ProductCategorySidebar }} onEnter={hideXsNav} >
					<Route path="spec/:id" component={DetailsPage} onEnter={hideXsNav} />
					<Route path=":ProductsTbl" component={ProductsTblPage} onEnter={hideXsNav} />
				</Route>
			</Route>
			<Route path="aboutus" authorize={['reAuth']} component={AboutPage} onEnter={hideXsNav} />
			<Route path="contact" authorize={['reAuth']} component={ContactPage} onEnter={hideXsNav} />
			<Route path="admin" authorize={['normal','admin']} component={AdminPage} onEnter={hideXsNav} >				
				<Route path="productChange/:id" component={AdminEditProductPage} onEnter={hideXsNav} />
				<Route path="productList/:cat" component={AdminListProductPage} onEnter={hideXsNav} />					
				<Route path="addUser" component={AddUserPage} onEnter={hideXsNav} />					
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


module.exports = Routes;
