import { Link} from 'react-router';
import React from 'react';

const AtomLink = (props) =>  (<li> <Link to={props.a.link} activeClassName={props.activeClass}> {props.a.desc} </Link></li>);

const ParentLink = (props) => {
	if ( props.item.sub && props.item.sub.length > 0) {
		return (
		<li>
			<Link to={props.item.link}> {props.item.desc} <i className="fa fa-caret-right"/></Link>
			<ul className="dropdown-menu">
				{
					props.item.sub.map((item, id) => {	return (<ParentLink  key={id} item={item}/>);	})
				}
			</ul>
		</li>
		);
	}else{
		return (<AtomLink a={{link:props.item.link, desc:props.item.desc}} activeClass={props.activeClass} />);
	}
};

const TopParentLink = (props) => {
	if ( props.item.sub && props.item.sub.length > 0) {
		return (
			<li>
				<div className="parent">
					<Link to={props.item.link} activeClassName="active">{props.item.desc}</Link><span className='caret'></span>
				</div>
				<ul className="dropdown-menu">
					{
						props.item.sub.map((item, id) => { return (<ParentLink  key={id} item={item}/>)})
					}
				</ul>
			</li>
		)
	}else{
		return (<AtomLink a={{link:props.item.link, desc:props.item.desc}} activeClass={props.activeClass} />);
	}

};

const NavBar = (props) =>  (
		<div id="cctv-nav" className="cctv-nav">
			<ul>
				<h3 id="XX"> <i className="fa fa-times" /></h3>
				{
					props.data.map && props.data.map( (item, id) => {
						return (item.sub && item.sub.length > 0) ? (<TopParentLink  key={id} item={item}/>	)
																: (<AtomLink key={id}  a={{link:item.link, desc:item.desc}} activeClass={props.activeClass} />)
					})
				}
			</ul>
		</div>
);


export {NavBar};
