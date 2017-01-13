import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import connectDataFetchers from '../../lib/connectDataFetchers.jsx';

import { CommonDetails } from './Details/CommonDetails';
// import * as detailActions from '../../actions/detailsActions';
import { loadDetails } from '../../actions/detailsActions';

const DetailsPage = (props) => {return ( <CommonDetails {...props} data={props.detail} />)};

DetailsPage.propTypes = {
	// actions: React.PropTypes.object.isRequired,
	detail:  React.PropTypes.object,
	params:  React.PropTypes.object
};


const mapStateToProps = (state, ownProps) => ({
    detail: state.details,
	ajaxState: state.ajaxCallsInProgress
});


// const mapDispatchToProps = (dispatch) => ({
//     actions: bindActionCreators(detailActions, dispatch)
// });

export default connect(mapStateToProps)(
    connectDataFetchers(DetailsPage, [ loadDetails ])
);

