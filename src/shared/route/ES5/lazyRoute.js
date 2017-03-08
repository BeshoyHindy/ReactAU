import React from 'react';
import { Router, Route, IndexRoute, IndexLink, browserHistory } from 'react-router';

import Root from '../../components/index';
import '../../lib/ensure-polyfill';

//https://github.com/webpack/webpack/issues/959
//when use require.ensure, don't use arrow function!!!
export default (store, hideXsNav) => ({
  path: '/',
  component: Root,
  getChildRoutes(location, cb) {
    require.ensure([], function(require) {
      cb(null, [
        require('./HomePage').default(store, hideXsNav),
        require('./SigninPage').default(store, hideXsNav),
        require('./SignupPage').default(store, hideXsNav),
        require('./UserPage').default(store, hideXsNav),
        require('./ProductsPage').default(store, hideXsNav),
        require('./AboutPage').default(store, hideXsNav),
        require('./ContactPage').default(store, hideXsNav),
        require('./AdminPage').default(store, hideXsNav),
        require('./UnauthorizedPage').default(store, hideXsNav),
        require('./NotFoundPage').default(store, hideXsNav),
      ]);
    });
  },
  getIndexRoute(location, cb) {
    require.ensure([], function(require) {
      cb(null, {
        component: require('../../components/HomePage').default,
      });
    });
  },
});


// const Routes = (props) => {
// 	let {store, history} = props;
// 	return (
// 	<Router history={history}>
// 		<Route path="/" component={Root}>
// 			<IndexRoute component={HomePage}/>
// 			<Route path="home" authorize={['reAuth']} component={HomePage} onEnter={props.hideXsNav} />
// 			<Route path="signin" component={SigninPage} onEnter={props.hideXsNav} />
// 			<Route path="signup" component={SignupPage} onEnter={props.hideXsNav} />
// 			<Route path="user" authorize={['normal']} component={UserPage} onEnter={props.hideXsNav} />
// 			<Route path="products" authorize={['reAuth']} component={ProductsPage} >
// 				<Route path=":product" components={{ content: ProductCategory, sidebar: ProductCategorySidebar }} onEnter={props.hideXsNav} >
// 					<Route path="spec/:id" component={DetailsPage} onEnter={props.hideXsNav} />
// 					<Route path=":ProductsTbl" component={ProductsTblPage} onEnter={props.hideXsNav} />
// 				</Route>
// 			</Route>
// 			<Route path="aboutus" authorize={['reAuth']} component={AboutPage} onEnter={props.hideXsNav} />
// 			<Route path="contact" authorize={['reAuth']} component={ContactPage} onEnter={props.hideXsNav} />
// 			<Route path="admin" authorize={['normal','admin']} component={AdminPage} onEnter={props.hideXsNav} >				
// 				<Route path="productChange/:id" component={AdminEditProductPage} onEnter={props.hideXsNav} />
// 				<Route path="productList/:cat" component={AdminListProductPage} onEnter={props.hideXsNav} />					
// 				<Route path="addUser" component={AddUserPage} onEnter={props.hideXsNav} />					
// 			</Route>
// 			<Route path="unauthorized" component={UnauthorizedPage} />
// 			<Route path="*" component={NotFoundPage} />
// 		</Route>
// 		<Route path="*" component={NotFoundPage} />
// 	</Router>);
// }
// Routes.propTypes = {
// 	history: React.PropTypes.object.isRequired,
// 	hideXsNav: React.PropTypes.func.isRequired
// };


// export default Routes;
