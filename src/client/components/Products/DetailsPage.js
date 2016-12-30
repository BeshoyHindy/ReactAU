import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { CommonDetails } from './Details/CommonDetails';
import * as detailActions from '../../actions/detailsActions';

class DetailsPage extends React.Component
{
	constructor(props) {
		super(props);
	}

	componentWillMount() {
	}
	componentDidMount () {
		this.props.actions.loadDetails(this.props.params.id);
	}
	componentDidUpdate (prevProps, prevState) {
	}

	render() {
		return ( <CommonDetails {...this.props} data={this.props.detail} />);
	}
}

DetailsPage.propTypes = {
	actions: React.PropTypes.object.isRequired,
	detail:  React.PropTypes.object,
	params:  React.PropTypes.object
};


const mapStateToProps = (state, ownProps) => ({
    detail: state.details
});


const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(detailActions, dispatch)
});


export default connect(mapStateToProps, mapDispatchToProps)(DetailsPage);

