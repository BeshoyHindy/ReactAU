import React from 'react';
import { Router, Route, IndexRoute, IndexLink, browserHistory } from 'react-router';

import HomePage from '../components/HomePage';
import SignupPage from '../components/SignupPage';
import SigninPage from '../components/SigninPage';
import UserPage from '../components/UserPage';
import AboutPage from '../components/AboutPage';
import ContactPage from '../components/ContactPage';
import {ProductCategorySidebar, ProductIndexSidebar} from '../components/Products/Sidebar/CategorySidebar';
import {ProductsPage, ProductCategory} from '../components/ProductsPage';
import ProductsTblPage from '../components/Products/ProductsTblPage';
import DetailsPage from '../components/Products/DetailsPage';

import AdminPage from '../components/AdminPage';
import AdminEditProductPage from '../components/Admin/AdminEditProductPage';
import AdminListProductPage from '../components/Admin/AdminListProductPage';
import AddUserPage from '../components/Admin/AddUserPage';

import { Root, NotFoundPage, UnauthorizedPage} from '../components/index';
//https://github.com/reactjs/react-router-redux/issues/179

const Routes = (props) => (
	<Router history={props.history}>
		<Route path="/" component={Root}>
			<IndexRoute component={HomePage}/>
			<Route path="home" authorize={['reAuth']} component={HomePage} />
			<Route path="signin" component={SigninPage} />
			<Route path="signup" component={SignupPage} />
			<Route path="user" authorize={['normal']} component={UserPage} />
			<Route path="products" authorize={['reAuth']} component={ProductsPage}>
				<Route path=":product" components={{ content: ProductCategory, sidebar: ProductCategorySidebar }}>
					<Route path="spec/:id" component={DetailsPage} />
					<Route path=":ProductsTbl" component={ProductsTblPage} />
				</Route>
			</Route>
			<Route path="aboutus" authorize={['reAuth']} component={AboutPage} />
			<Route path="contact" authorize={['reAuth']} component={ContactPage} />
			<Route path="admin" authorize={['normal','admin']} component={AdminPage} >				
				<Route path="productChange/:id" component={AdminEditProductPage} />
				<Route path="productList/:cat" component={AdminListProductPage} />					
				<Route path="addUser" component={AddUserPage} />					
			</Route>
			<Route path="unauthorized" component={UnauthorizedPage} />
			<Route path="*" component={NotFoundPage} />
		</Route>
		<Route path="*" component={NotFoundPage} />
	</Router>
);
Routes.propTypes = {
	history: React.PropTypes.object
};


export default Routes;
