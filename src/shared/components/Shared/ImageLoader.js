if (process.env.BROWSER) {
	require ('./ImageLoader.sass');
}

import React from 'react';
class ImageLoader extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			show: props.showTransition
		};
		this.handleImageLoaded = this.handleImageLoaded.bind(this);
	}
	componentDidMount() {
		let img = this.Img;
		if (img && img.complete && img.naturalHeight !== 0){
			this.setState({show: true});
		}
	}	
	componentWillReceiveProps(nextProps){
		if (nextProps.src === this.props.src || nextProps.reset===false)
			return;

		this.setState({show: false});
	}	
	handleImageLoaded(e){
		this.setState({show: true});
	}	
	render() {
		let {src, cssClass, alt, minHeight, showLoading, showTransition} = this.props;
		let imgCssClass = (showTransition===false?" ":" transition");
		cssClass += showLoading===false?" non-loading-div":" loading-div";
		let loadingStyle={
			minHeight: minHeight,
			backgroundImage: this.state.show?"none":this.props.loadingGif 
		};
		return(
			<div className={cssClass} style={loadingStyle}>
				<img src={src} alt={alt} style={{opacity: this.state.show?"1":"0"}} className={imgCssClass} title={this.props.title}  
					onLoad={this.handleImageLoaded} ref={(el) => { this.Img = el; }} />
			</div>
		);
	}
}

ImageLoader.propTypes = {
	src: React.PropTypes.string,
	cssClass: React.PropTypes.string,
	alt: React.PropTypes.string,
	title: React.PropTypes.string,
	minHeight: React.PropTypes.string,
	showLoading: React.PropTypes.bool,
	showTransition: React.PropTypes.bool,
	loadingGif: React.PropTypes.string,
};

ImageLoader.defaultProps = {
	loadingGif: "url('/img/ajax-loader.gif')"
};

export {ImageLoader};				
