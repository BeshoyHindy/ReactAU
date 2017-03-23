if (process.env.BROWSER) {
	require ('../Sass/admin.scss');
}
import React from 'react';
import { connect } from 'react-redux';
import connectDataFetchers from '../lib/connectDataFetchers.jsx';
import {RouteWithSubRoutes} from '../route/util';

let AdminPage = ({match, routes, auth, level, Comps, url}) => { 
  return (
	<div className="container">
		<div className="loading-wrap">
			<div className={`ajax-loading-big ${(!auth.success || !auth.user || !auth.user.accessRight || auth.user.accessRight !== 8) ?'fade-show':'fade-hide'}`} >
				<h1 className="center-page"> Unauthorized </h1>
			</div>	    
			<div>	
				{routes.map(route => (<RouteWithSubRoutes key={route.path + level} route={route} level={level}  Comps={Comps} url={url}/>))}
			</div>
		</div>
	</div>
    ) ;
};

AdminPage.propTypes = {
	auth:  React.PropTypes.object,
	routes:  React.PropTypes.array,
	Comps:  React.PropTypes.array,
	level:  React.PropTypes.number,
	url: React.PropTypes.string,
	match:  React.PropTypes.object,
    children: React.PropTypes.oneOfType([
      React.PropTypes.arrayOf(React.PropTypes.node),
      React.PropTypes.node
    ])	
};

function mapStateToProps(state, ownProps) {
  return {
		auth: state.auth
  };
}

AdminPage = connect(mapStateToProps)(
    connectDataFetchers(AdminPage, [ ])
);


export default AdminPage;
