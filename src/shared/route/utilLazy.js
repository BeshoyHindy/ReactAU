import React from 'react';
import {  Route} from 'react-router-dom';
function errorLoading(err) {
	console.error('Dynamic page loading failed', err);
}

let RouteWithSubRoutes = class RouteWithSubRoutes extends React.Component{
	constructor(props) {
		super(props);
		this.state = {loaded: false};
	}  
	componentDidMount () {
		System.import(`../components/${this.props.componentPath}`).then((module) => {
			this.Component = module.default;
			this.setState({loaded: true});
		}).catch(errorLoading)
	}
	render () {
		let route = this.props;
		return (
		<div>
			{this.state.loaded && <Route path={route.path} exact={route.exact} authorize={route.authorize}  render={props => (
				<this.Component {...props} routes={route.routes}/>)}/>}
		
		</div>);
	}
}

RouteWithSubRoutes.propTypes = {
    props: React.PropTypes.object,
    componentPath: React.PropTypes.string,
};

export {RouteWithSubRoutes};
