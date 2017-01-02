import React from 'react';
import { IndexRoute, IndexLink, browserHistory } from 'react-router';


import {ContactPage} from '../components/ContactPage';
import {ProductCategorySidebar, ProductIndexSidebar} from '../components/Products/Sidebar/CategorySidebar';
import {ProductsPage, ProductCategory} from '../components/ProductsPage';
import ProductsTblPage from '../components/Products/ProductsTblPage';
import DetailsPage from '../components/Products/DetailsPage';

import { Root,NotFoundPage} from '../components/index';

// throws an error in the console if the page wasn't able to load
function errorLoading(error) {
  throw new Error(`Dynamic page loading failed: ${error}`);
}

// Loading modules!
function loadRoute(cb) {
  return module => cb(null, module.default);
}


// <Route path="/" component={Root}>
// 	<IndexRoute component={HomePage}/>
// 	<Route path="home" component={HomePage} />
// 	<Route path="products" component={ProductsPage}>
// 		<Route path=":product" components={{ content: ProductCategory, sidebar: ProductCategorySidebar }}>
// 			<Route path="spec/:id" component={DetailsPage} />
// 			<Route path=":ProductsTbl" component={ProductsTblPage} />
// 		</Route>
// 	</Route>
// 	<Route path="aboutus" component={AboutPage} />
// 	<Route path="contact" component={ContactPage} />
// </Route>
// <Route path="*" component={NotFoundPage} />


export default {
  path: '/', 
  component: Root,
  indexRoute: {
    getComponent(location, cb) {
      System.import('../components/HomePage')
        .then(loadRoute(cb))
        .catch(errorLoading);
    },
  },
  childRoutes: [
    {
      path: 'products', 
      getComponent(location, cb) {
        System.import('../components/ProductsPage')
          .then(loadRoute(cb, false))
          .catch(errorLoading);
      },
	  childRoutes: [
		  {
			path: 'spec/:id', 
			getComponent(location, cb) {
				System.import('../components/Products/DetailsPage')
				.then(loadRoute(cb, false))
				.catch(errorLoading);
			},
		 },
		  {
			path: ':ProductsTbl', 
			getComponent(location, cb) {
				System.import('../components/Products/ProductsTblPage')
				.then(loadRoute(cb, false))
				.catch(errorLoading);
			},
		 },		 
	  ]
    },
    {
      path: 'home', 
      getComponent(location, cb) {
        System.import('../components/HomePage')
          .then(loadRoute(cb, false))
          .catch(errorLoading);
      },
    },	
    {
      path: 'aboutus', 
      getComponent(location, cb) {
        System.import('../components/AboutPage')
          .then(loadRoute(cb, false))
          .catch(errorLoading);
      },
    },
    {
      path: 'contact', 
      getComponent(location, cb) {
        System.import('../components/ContactPage')
          .then(loadRoute(cb))
          .catch(errorLoading);
      },
    },
    {
      path: '*', 
      getComponent(location, cb) {
        System.import('../components/HomePage')
          .then(loadRoute(cb))
          .catch(errorLoading);
      },
    },
  ],
};