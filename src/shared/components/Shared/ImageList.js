import React from 'react';
import { ImageLoader } from '../Shared/ImageLoader';

class ImageList extends React.Component{
	constructor(props) {
		super(props);

		this.handleClick = this.handleClick.bind(this);
	}
	handleClick(e){
		this.props.toHandleClick(this.props.id);
	}
	render() {
		return (
			<li onClick={this.handleClick} className={this.props.id==this.props.activeItem?"active":""}>
				<ImageLoader
					alt={this.props.alt}
					title={this.props.title}
					src={this.props.src}
					minHeight={this.props.minHeight} 
					reset={this.props.reset !== undefined?this.props.reset:true}
				/>
			</li>
		);
	}
}
ImageList.propTypes = {
	toHandleClick: React.PropTypes.func,
	src:  React.PropTypes.string,
	alt:  React.PropTypes.string,
	title:  React.PropTypes.string,
	loaderStyle:  React.PropTypes.object,
	activeItem: React.PropTypes.number,
	id: React.PropTypes.number,
	reset: React.PropTypes.bool,
};
export {ImageList};
