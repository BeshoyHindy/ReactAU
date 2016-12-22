require('../../sass/main.scss');
require("font-awesome-sass-loader");
require.context('../../img', true, /\.?/);

import { Link} from 'react-router';
import React from 'react';
import axios from 'axios';
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


function mapStateToProps(state, ownProps) {
  return {
    detail: state.details
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(detailActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailsPage);

