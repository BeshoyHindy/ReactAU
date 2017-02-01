import React from 'react';
import { connect } from 'react-redux';

import connectDataFetchers from '../lib/connectDataFetchers.jsx';
import { loadCategories } from '../actions/adminActions';

let AdminPage = (props) => { 
  return (
	<div className="loading-wrap">
      <div className={`ajax-loading-big ${(!props.auth.success || !props.auth.user || !props.auth.user.accessRight || props.auth.user.accessRight !== 8) ?'fade-show':'fade-hide'}`} >
          <img src="/img/ajax-loader.gif" alt=""/>
          <div className="ajax-loading-progress">
            loading....
          </div>
      </div>	    
      <div>	{props.children}</div>
   </div>
    ) 
}

AdminPage.propTypes = {
	auth:  React.PropTypes.object,
};

function mapStateToProps(state, ownProps) {
  return {
	  auth: state.auth,
  };
}

AdminPage = connect(mapStateToProps)(
    connectDataFetchers(AdminPage, [ loadCategories ])
);


export default AdminPage;