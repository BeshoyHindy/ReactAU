import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import connectDataFetchers from '../../lib/connectDataFetchers.jsx';
import { CommonDetails } from './Details/CommonDetails';
import { loadDetails } from '../../actions/detailsActions';

const DetailsPage = (props) => {return ( <CommonDetails {...props} data={props.detail} />);};

DetailsPage.propTypes = {
	detail:  React.PropTypes.object,
	auth:  React.PropTypes.object,
	params:  React.PropTypes.object
};


const mapStateToProps = (state, ownProps) => ({
    detail: state.details,
	ajaxState: state.ajaxCallsInProgress,
	auth: state.auth,
});


// const mapDispatchToProps = (dispatch) => ({
//     actions: bindActionCreators(detailActions, dispatch)
// });

export default connect(mapStateToProps)(
    connectDataFetchers(DetailsPage, [ loadDetails ])
);

