import React from 'react';
import { Router, Route, IndexRoute, IndexLink, browserHistory } from 'react-router';

import Root from '../components/index';
import HomePage from '../components/HomePage';
import '../lib/ensure-polyfill';
//https://github.com/reactjs/react-router-redux/issues/179
if (typeof System === "undefined") {
  var System = {
    import: function(path) {
      return Promise.resolve(require(path));
    }
  };
}

function errorLoading(err) {
	console.error('Dynamic page loading failed', err);
}
function loadRoute(cb) {
	return (module) => cb(null, module.default);
}
function loadIndexRoute(cb) {
	return (module) => cb(null, {
        component: module.default,
      });
}
export default (store, hideXsNav) => ({
	path: '/',
	component: Root,
	getIndexRoute(location, cb) {
		System.import('../components/HomePage').then(loadIndexRoute(cb)).catch(errorLoading);
	},
	childRoutes: [
		{
			path: 'home',
			authorize: ['reAuth'], 
			onEnter: hideXsNav ,
			component: HomePage,
		},
		{
			path: 'signin',
			onEnter: hideXsNav ,
			getComponent(location, cb) {
				System.import('../components/SigninPage').then(loadRoute(cb)).catch(errorLoading);
			}
		},
		{
			path: 'signup',
			onEnter: hideXsNav ,
			getComponent(location, cb) {
				System.import('../components/SignupPage').then(loadRoute(cb)).catch(errorLoading);
			}
		},
		{
			path: 'user',
			authorize: ['normal'],
			onEnter: hideXsNav ,
			getComponent(location, cb) {
				System.import('../components//UserPage').then(loadRoute(cb)).catch(errorLoading);
			}
		},
		{
			path: 'aboutus',
			authorize: ['reAuth'],
			onEnter: hideXsNav ,
			getComponent(location, cb) {
				System.import('../components/AboutPage').then(loadRoute(cb)).catch(errorLoading);
			}
		},
		{
			path: 'contact',
			authorize: ['reAuth'],
			onEnter: hideXsNav ,
			getComponent(location, cb) {
				System.import('../components/ContactPage').then(loadRoute(cb)).catch(errorLoading);
			}
		},
		{
			path: 'products',
			authorize: ['reAuth'],
			onEnter: hideXsNav ,
			getComponent(location, cb) {
				System.import('../components/ProductsPage').then(loadRoute(cb)).catch(errorLoading);
			},
			childRoutes: [
				{
					path: ':product',
					authorize: ['reAuth'], 
					onEnter: hideXsNav ,
					getComponents(nextState, cb) {
						var ProductCategory, ProductCategorySidebar;
						System.import('../components/Products/ProductCategory').then((module)=> {
							ProductCategory = module.default;
							return System.import('../components/Products/Sidebar/ProductCategorySidebar');
						}).then((module)=> {
							ProductCategorySidebar = module.default;
							cb(null, {content: ProductCategory, sidebar: ProductCategorySidebar});
						}).catch(errorLoading);						
					},
					childRoutes: [
						{
							path: 'spec/:id',
							authorize: ['reAuth'], 
							onEnter: hideXsNav ,
							getComponent(location, cb) {
								System.import('../components/Products/DetailsPage').then(loadRoute(cb)).catch(errorLoading);
							}
						},
						{
							path: ':ProductsTbl',
							authorize: ['reAuth'], 
							onEnter: hideXsNav ,
							getComponent(location, cb) {
								System.import('../components/Products/ProductsTblPage').then(loadRoute(cb)).catch(errorLoading);
							}
						},
					]
				},
			]
		},
		{
			path: 'admin',
			authorize: ['normal','admin'],
			onEnter: hideXsNav ,
			getComponent(location, cb) {
				System.import('../components/AdminPage').then(loadRoute(cb)).catch(errorLoading);
			},
			childRoutes: [
				{
					path: 'productChange/:id',
					onEnter: hideXsNav ,
					getComponent(location, cb) {
						System.import('../components/Admin/AdminEditProductPage').then(loadRoute(cb)).catch(errorLoading);
					},					
				},
				{
					path: 'productList/:cat',
					onEnter: hideXsNav ,
					getComponent(location, cb) {
						System.import('../components/Admin/AdminListProductPage').then(loadRoute(cb)).catch(errorLoading);
					},					
				},
				{
					path: 'addUser',
					onEnter: hideXsNav ,
					getComponent(location, cb) {
						System.import('../components/Admin/AddUserPage').then(loadRoute(cb)).catch(errorLoading);
					},					
				},
			]
		},
		{
			path: 'unauthorized',
			getComponent(location, cb) {
				System.import('../components/UnauthorizedPage').then(loadRoute(cb)).catch(errorLoading);
			}
		},
		{
			path: '*',
			getComponent(location, cb) {
				System.import('../components/NotFoundPage').then(loadRoute(cb)).catch(errorLoading);
			}
		},
	]
});


