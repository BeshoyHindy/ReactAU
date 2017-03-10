import React from 'react';
import connectDataFetchers from '../lib/connectDataFetchers.jsx';
import { getDevice } from '../actions/deviceAction';
import { loadCategories } from '../actions/adminActions';
import { connect } from 'react-redux';

const UnauthorizedPage = (props) 	=> (
		<div className="row">
			<div className="col-xs-12">
				<h1 className="center-page"> Unauthorized </h1>
			</div>
		</div>
	);


export default connect(null)(connectDataFetchers(UnauthorizedPage, [ loadCategories, getDevice ]));

