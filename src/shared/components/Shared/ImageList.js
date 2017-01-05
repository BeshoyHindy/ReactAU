import React from 'react';
import ImageLoader from 'react-imageloader';

class ImageList extends React.Component{
	constructor(props) {
		super(props);

		this.handleClick = this.handleClick.bind(this);
		this.thumbnailImgpreLoader = this.thumbnailImgpreLoader.bind(this);
	}
	thumbnailImgpreLoader() {
		return <div className="loading-div" style={this.props.loaderStyle}/>;
	}
	handleClick(e){
		this.props.toHandleClick(this.props.id);
	}
	render() {
		return (
			<li onClick={this.handleClick} className={this.props.id==this.props.activeItem?"active":""}>
				<ImageLoader
					src={this.props.src}
					wrapper={React.DOM.div}
					preloader={this.thumbnailImgpreLoader} >NOT FOUND
				</ImageLoader>
			</li>
		);
	}
}
ImageList.propTypes = {
	toHandleClick: React.PropTypes.func,
	src:  React.PropTypes.string,
	loaderStyle:  React.PropTypes.object,
	activeItem: React.PropTypes.number,
	id: React.PropTypes.number
};
export {ImageList};
