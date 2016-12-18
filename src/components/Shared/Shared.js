import React from 'react';
import { Link} from 'react-router';
import ImageLoader from 'react-imageloader';


function ProductTblImgpreloader() {
	return <div className="loading-div" style={{minHeight: "100px"}}/>;
}

const IntercomProductTblImageComponent = (props) => (
	<Link to={"/products/INTERCOM/spec/" + props.rowData.id}>
		<ImageLoader
			src={props.data}
			wrapper={React.DOM.div}
			preloader={ProductTblImgpreloader}>NOT FOUND
		</ImageLoader>
	</Link>
);
const NvrProductTblImageComponent = (props) => (
	<Link to={"/products/NVR/spec/" + props.rowData.id}>
		<ImageLoader
			src={props.data}
			wrapper={React.DOM.div}
			preloader={ProductTblImgpreloader}>NOT FOUND
		</ImageLoader>
	</Link>
);
const AlarmProductTblImageComponent = (props) => (
	<Link to={"/products/ALARM/spec/" + props.rowData.id}>
		<ImageLoader
			src={props.data}
			wrapper={React.DOM.div}
			preloader={ProductTblImgpreloader}>NOT FOUND
		</ImageLoader>
	</Link>
);
const CctvProductTblImageComponent = (props) => (
	<Link to={"/products/CCTV/spec/" + props.rowData.id}>
		<ImageLoader
			src={props.data}
			wrapper={React.DOM.div}
			preloader={ProductTblImgpreloader}>NOT FOUND
		</ImageLoader>
	</Link>
);
const DvrProductTblImageComponent = (props) => (
	<Link to={"/products/DVR/spec/" + props.rowData.id}>
		<ImageLoader
			src={props.data}
			wrapper={React.DOM.div}
			preloader={ProductTblImgpreloader}>NOT FOUND
		</ImageLoader>
	</Link>
);
const KitProductTblImageComponent = (props) => (
	<Link to={"/products/Kit/spec/" + props.rowData.id}>
		<ImageLoader
			src={props.data}
			wrapper={React.DOM.div}
			preloader={ProductTblImgpreloader}>
			NOT FOUND
		</ImageLoader>
	</Link>
);



const PureList = (props) => ( <ul>{props.data.map( (item, id) => { return ( <li key={id}> {item} </li> ); })} </ul>);

PureList.propTypes = {
  data: React.PropTypes.array.isRequired
};


const GoogleMap = (props) => (
		<iframe width="100%" height={props.height ||"400px"} scrolling={props.scrol ||"no"}	src={props.link} />
);
GoogleMap.propTypes = {
  link: React.PropTypes.string.isRequired,
  height: React.PropTypes.string,
  scrol: React.PropTypes.string
};


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
);
Breadcrumb.propTypes = {
  linkPair: React.PropTypes.array.isRequired
};


const BigHeader = (props) => (
	<h1 className="page-header">{props.children}
			<small>{props.smallTitle}</small>
		</h1>
);
BigHeader.propTypes = {
  smallTitle: React.PropTypes.string,
  children: React.PropTypes.node
};



const OrangeBoard = (props) => (
	<div className="about">
		{props.children}
	</div>
);
OrangeBoard.propTypes = {
  children: React.PropTypes.node
};


const Paragraph = (props) => (
	<div>
		<BigHeader smallTitle={props.smallTitle}>{props.title}</BigHeader>
		<p>
			{props.children}
		</p>
	</div>
);
Paragraph.propTypes = {
  title: React.PropTypes.string,
  smallTitle: React.PropTypes.string,
  children: React.PropTypes.node
};

export { Breadcrumb , BigHeader , OrangeBoard, Paragraph, PureList, GoogleMap
		, IntercomProductTblImageComponent, NvrProductTblImageComponent, AlarmProductTblImageComponent
		, CctvProductTblImageComponent, DvrProductTblImageComponent, KitProductTblImageComponent};
