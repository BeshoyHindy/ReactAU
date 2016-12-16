import React from 'react';
import { Link} from 'react-router';

const PureList = (props) => ( <ul>{props.data.map( (item, id) => { return ( <li key={id}> {item} </li> ); })} </ul>)

const GoogleMap = (props) => (
		<iframe width="100%" height={props.height ||"400px"} scrolling={props.scrol ||"no"}	src={props.link}>
		</iframe>
)

const Breadcrumb = (props) => (
	<ol className="breadcrumb">{
			props.linkPair.map((item, id) => {
				if(item.link){
					return (<li key={id}><Link to={item.link}> {item.desc} </Link></li>);
				}else{
					return (<li key={id}> {item.desc}</li>);
				}
			})
		}
	</ol>
	)

const BigHeader = (props) => (
	<h1 className="page-header">{props.children}
			<small>{props.smallTitle}</small>
		</h1>
	)

const OrangeBoard = (props) => (
	<div className="about">
		{props.children}
	</div>
)	

const Paragraph = (props) => (
	<div>
		<BigHeader smallTitle={props.smallTitle}>{props.title}</BigHeader>
		<p>
			{props.children}
		</p>
	</div>
);

export { Breadcrumb , BigHeader , OrangeBoard, Paragraph, PureList, GoogleMap};