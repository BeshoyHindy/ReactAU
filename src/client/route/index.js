import React from 'react';
import { Router, Route, IndexRoute, IndexLink, browserHistory } from 'react-router';

import {HomePage} from '../components/HomePage';
import {AboutPage} from '../components/AboutPage';
import {ContactPage} from '../components/ContactPage';
import {ProductCategorySidebar, ProductIndexSidebar} from '../components/Products/Sidebar/CategorySidebar';
import {ProductsPage, ProductCategory} from '../components/ProductsPage';
import ProductsTblPage from '../components/Products/ProductsTblPage';
import DetailsPage from '../components/Products/DetailsPage';

import { Root,NotFoundPage} from '../components/index';

export default function createRoutes(history = browserHistory) {
	return (
		<Router history={history}>
			<Route path="/" component={Root}>
				<IndexRoute component={HomePage}/>
				<Route path="home" component={HomePage} />
				<Route path="products" component={ProductsPage}>
					<Route path=":product" components={{ content: ProductCategory, sidebar: ProductCategorySidebar }}>
						<Route path="spec/:id" component={DetailsPage} />
						<Route path=":ProductsTbl" component={ProductsTblPage} />
					</Route>
				</Route>
				<Route path="aboutus" component={AboutPage} />
				<Route path="contact" component={ContactPage} />
			</Route>
		</Router>
	);
}