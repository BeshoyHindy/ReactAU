require('../../sass/main.scss');
require("font-awesome-sass-loader");
require.context('../../img', true, /\.?/);

import { Link} from 'react-router';
import React from 'react';
import axios from 'axios';
import { CommonDetails } from './CommonDetails';

class Details extends React.Component
{
	constructor(props) {
		super(props);
		this.state = {
			detail:{}
		};
		this.fetchData = this.fetchData.bind(this);
	}

	componentWillMount() {
	}
	componentDidMount() {
		this.fetchData();
	}
	componentDidUpdate (prevProps, prevState) {
	}

	fetchData(){
		axios({
			method: 'get',
			url: '/json/details/'+this.props.params.id+'.json',
			dataType: 'JSON'
		})
		.then( (response) => {
			this.setState({
				detail: response.data
			});
		})
		.catch(function (error) {
			//console.log(error);
		});
	}
	render() {
		return ( <CommonDetails {...this.props} data={this.state.detail} />);
	}
}

Details.propTypes = {
	params: React.PropTypes.object,
};

export {Details};
