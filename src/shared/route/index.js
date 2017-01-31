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
import AdminEditProductPage from '../components/admin/AdminEditProductPage';
import AdminListProductPage from '../components/admin/AdminListProductPage';
import AddUserPage from '../components/admin/AddUserPage';

import { Root,NotFoundPage} from '../components/index';

export default function createRoutes(history = browserHistory) {
	return (
		<Router history={history}>
			<Route path="/" component={Root}>
				<IndexRoute component={HomePage}/>
				<Route path="home" component={HomePage} />
				<Route path="signin" component={SigninPage} />
				<Route path="signup" component={SignupPage} />
				<Route path="user" component={UserPage} />
				<Route path="home" component={HomePage} />
				<Route path="products" component={ProductsPage}>
					<Route path=":product" components={{ content: ProductCategory, sidebar: ProductCategorySidebar }}>
						<Route path="spec/:id" component={DetailsPage} />
						<Route path=":ProductsTbl" component={ProductsTblPage} />
					</Route>
				</Route>
				<Route path="aboutus" component={AboutPage} />
				<Route path="contact" component={ContactPage} />
				<Route path="admin" component={AdminPage} >				
					<Route path="productChange/:id" component={AdminEditProductPage} />
					<Route path="productList/:cat" component={AdminListProductPage} />					
					<Route path="addUser" component={AddUserPage} />					
				</Route>
				<Route path="*" component={NotFoundPage} />
			</Route>
			<Route path="*" component={NotFoundPage} />
		</Router>
	);
}
