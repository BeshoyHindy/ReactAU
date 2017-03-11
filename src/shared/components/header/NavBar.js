import { NavLink , Link} from 'react-router-dom';
import React from 'react';
import { connect } from 'react-redux';

import { navData } from '../../Data/RouteData';
import * as modalActions from '../../actions/modalAction';

const AtomNavLink = (props) =>  (<li> <NavLink to={props.a.link} activeClassName={props.activeClassName}> {props.a.desc} </NavLink></li>);
AtomNavLink.propTypes = {
  a: React.PropTypes.object,
  activeClassName: React.PropTypes.string
};

const AtomLink = (props) =>  (<li> <Link to={props.a.link} > {props.a.desc} </Link></li>);
AtomLink.propTypes = {
  a: React.PropTypes.object
};


const ParentLink = (props) => {
	if ( props.item.sub && props.item.sub.length > 0) {
		return (
		<li>
			<Link to={props.item.link} > {props.item.desc} <i className="fa fa-caret-right"/></Link>
			<ul className="dropdown-menu">
				{
					props.item.sub.map((item, id) => {	return (<ParentLink  key={id} item={item}/>);	})
				}
			</ul>
		</li>
		);
	}else{
		return (<AtomLink a={{link:props.item.link, desc:props.item.desc}}  activeClass={props.activeClassName} />);
	}
};
ParentLink.propTypes = {
  item: React.PropTypes.object,
  activeClassName: React.PropTypes.string
};


const TopParentLink = (props) => {
	if ( props.item.sub && props.item.sub.length > 0) {
		return (
			<li>
				<div className="parent">
					<NavLink to={props.item.link} activeClassName={props.activeClassName}>{props.item.desc}</NavLink><span className="caret" />
				</div>
				<ul className="dropdown-menu">
					{
						props.item.sub.map((item, id) => { return (<ParentLink key={id} item={item}/>);})
					}
				</ul>
			</li>
		);
	}else{
		return (<AtomLink a={{link:props.item.link, desc:props.item.desc}} activeClass={props.activeClassName} />);
	}
};
TopParentLink.propTypes = {
  item: React.PropTypes.object,
  activeClassName: React.PropTypes.string
};

let NavBar = class Root extends React.Component{
	constructor(props) {
		super(props);
		this.hideXsNav = this.hideXsNav.bind(this);
	}
	hideXsNav(){
		this.props.changeXsNavModal(false);
	}
	render() {
		let props = this.props;
	return (
		<div id="cctv-nav" className={`cctv-nav ${props.showXsNav?'show-xs-nav':''}`} >
			<ul>
				<h3 id="XX" onClick={this.hideXsNav}> <i className="fa fa-times" /></h3>
				{
					navData.map && navData.map( (item, id) => {
						return (item.sub && item.sub.length > 0) ? (<TopParentLink  key={id} item={item} activeClassName={props.activeClass}/>	)
																: (<AtomNavLink key={id}  a={{link:item.link, desc:item.desc}}  activeClassName={props.activeClass} />);
					})
				}
			</ul>
		</div>
		);
	}
};

NavBar.propTypes = {
  activeClass: React.PropTypes.string,
  showXsNav: React.PropTypes.bool.isRequired,
  changeXsNavModal: React.PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
	showXsNav: state.modal.showXsNav,
  };
}

NavBar = connect(mapStateToProps, { ...modalActions})(NavBar);

export {NavBar};
