import React from 'react';
import { Route  } from 'react-router';

export default class ParentNode extends React.Component {
	constructor(props) {
		super(props);
		this.get_comp = this.get_comp.bind(this);
	}	
	getChildRoutes(location, callback) {
		System.import(this.props.component)
		.then((component) => {
			callback(null, component.default || component);
		});
	}
	get_indexRoute (location, callback) {
		System.import(this.props.component)
		.then((component) => {
			callback(null, component.default || component);
		});
	}	
	render() {
		<Route
			path={this.props.path}
			getChildRoutes={this.get_comp}
			getIndexRoute={this.get_indexRoute}
		/>;
	}
}


ParentNode.propTypes = {
	component:  React.PropTypes.oneOfType([
      React.PropTypes.arrayOf(React.PropTypes.node),
      React.PropTypes.node
    ]).isRequired,
	path: React.PropTypes.string.isRequired,	
};
