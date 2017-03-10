if (process.env.BROWSER) {
	require ('./admin.scss');
}
import React from 'react';
import { connect } from 'react-redux';
import connectDataFetchers from '../lib/connectDataFetchers.jsx';
import { getDevice } from '../actions/deviceAction';
import { loadCategories } from '../actions/adminActions';

let AdminPage = (props) => { 
  return (
	<div className="container">
		<div className="loading-wrap">
			<div className={`ajax-loading-big ${(!props.auth.success || !props.auth.user || !props.auth.user.accessRight || props.auth.user.accessRight !== 8) ?'fade-show':'fade-hide'}`} >
				<h1 className="center-page"> Unauthorized </h1>
			</div>	    
			<div>	
				{props.children}
			</div>
		</div>
	</div>
    ) ;
};

AdminPage.propTypes = {
	auth:  React.PropTypes.object,
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
    connectDataFetchers(AdminPage, [ loadCategories, getDevice ])
);


export default AdminPage;
