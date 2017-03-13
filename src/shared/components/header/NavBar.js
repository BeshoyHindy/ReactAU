import { NavLink , Link} from 'react-router-dom';
import React from 'react';
import { navData } from '../../Data/RouteData';
import { connect } from 'react-redux';

const AtomNavLink = (props) =>  (<li> <NavLink to={props.a.link} activeClassName={props.activeClassName} onClick={()=>props.SmNavCtrl()}> {props.a.desc} </NavLink></li>);
AtomNavLink.propTypes = {
  a: React.PropTypes.object,
  SmNavCtrl: React.PropTypes.func.isRequired,  
  activeClassName: React.PropTypes.string
};

const AtomLink = (props) =>  (<li> <Link to={props.a.link}  onClick={()=>props.SmNavCtrl()}> {props.a.desc} </Link></li>);
AtomLink.propTypes = {
  a: React.PropTypes.object,
  SmNavCtrl: React.PropTypes.func.isRequired,  
};


const ParentLink = (props) => {
	if ( props.item.sub && props.item.sub.length > 0) {
		return (
		<li>
			<Link to={props.item.link} onClick={()=>props.SmNavCtrl()}> {props.item.desc} <i className="fa fa-caret-right"/></Link>
			<ul className="dropdown-menu">
				{
					props.item.sub.map((item, id) => {	return (<ParentLink  key={id} item={item} SmNavCtrl={props.SmNavCtrl}/>);	})
				}
			</ul>
		</li>
		);
	}else{
		return (<AtomLink a={{link:props.item.link, desc:props.item.desc}} SmNavCtrl={props.SmNavCtrl} activeClass={props.activeClassName} />);
	}
};
ParentLink.propTypes = {
  item: React.PropTypes.object,
  SmNavCtrl: React.PropTypes.func.isRequired,  
  activeClassName: React.PropTypes.string
};


const TopParentLink = (props) => {
	return (
		<li>
			<div className="parent">
				<NavLink to={props.item.link} activeClassName={props.activeClassName} onClick={()=>props.SmNavCtrl()}> 
					{props.item.desc}
				</NavLink><span className="caret" />
			</div>
			<ul className="dropdown-menu">
				{
					props.item.sub.map((item, id) => { return (<ParentLink key={id} item={item}  SmNavCtrl={props.SmNavCtrl}/>);})
				}
			</ul>
		</li>
	);

};
TopParentLink.propTypes = {
  item: React.PropTypes.object,
  SmNavCtrl: React.PropTypes.func.isRequired,
  activeClassName: React.PropTypes.string
};


let NavBar = class NavBar extends React.Component{
	constructor(props) {
		super(props);
		this.SmNavCtrl = this.SmNavCtrl.bind(this);
	}
	SmNavCtrl(){
		this.props.SmNavCtrl(false);
	}
	render() {	
		let {showSmNav, SmNavCtrl, activeClass} = this.props;
		return (
			<div id="cctv-nav" className={`cctv-nav ${showSmNav?'show-xs-nav':''}`} >
				<ul>
					<h3 id="XX" onClick={this.SmNavCtrl}> <i className="fa fa-times" /></h3>
					{
						navData.map && navData.map( (item, id) => {
							return (item.sub && item.sub.length > 0) ? (<TopParentLink  key={id} item={item} activeClassName={activeClass} SmNavCtrl={SmNavCtrl}/>	)
																	: (<AtomNavLink key={id}  a={{link:item.link, desc:item.desc}}  activeClassName={activeClass} SmNavCtrl={SmNavCtrl}/>);
						})
					}
				</ul>
			</div>
		);
	}
};


NavBar.propTypes = {
  activeClass: React.PropTypes.string,
  showSmNav: React.PropTypes.bool,
  SmNavCtrl: React.PropTypes.func,
};


export default NavBar;
