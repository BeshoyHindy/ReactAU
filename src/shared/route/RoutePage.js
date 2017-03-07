import React from 'react';
import { Route  } from 'react-router';

export default class NodePage extends React.Component {
	constructor(props) {
		super(props);
		this.get_comp = this.get_comp.bind(this);
	}	
	get_comp(location, callback) {
		System.import(this.props.component)
		.then((component) => {
			callback(null, component.default || component);
		});
	}
	render() {
		<Route
			path={this.props.path}
			getComponent={this.get_comp}
		/>;
	}
}


NodePage.propTypes = {
	component:  React.PropTypes.oneOfType([
      React.PropTypes.arrayOf(React.PropTypes.node),
      React.PropTypes.node
    ]).isRequired,
	indexComponent:  React.PropTypes.oneOfType([
      React.PropTypes.arrayOf(React.PropTypes.node),
      React.PropTypes.node
    ]),
	chilrednComponents: React.PropTypes.array,	
	path: React.PropTypes.string.isRequired,	
};
