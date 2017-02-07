import React from 'react';
import {Footer} from './CarouselFooter';

import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class Carousel extends React.Component{
	constructor(props) {
		super(props);
		this.state ={
			currentId: 0
		};
		this.setCurrent = this.setCurrent.bind(this);
		this.addCurrent = this.addCurrent.bind(this);
		this.subCurrent = this.subCurrent.bind(this);
	}

	componentDidMount () {
		if (this.props.autoplay > 0){
			this._timer = setInterval( () => this.setCurrent(this.state.currentId + 1), this.props.autoplay);
		}
	}
	componentWillUnmount () {
		//console.log('componentWillUnmount', this._timer);
		if (this._timer)
			clearInterval(this._timer );
	}
	addCurrent(){
		this.setCurrent( this.state.currentId + 1);
	}
	subCurrent(){
		this.setCurrent( this.state.currentId - 1);
	}
	setCurrent(id){
		let carouselChildren = this.props.carouselChildren || [];
		if (this.props.loop){
			id = (id + carouselChildren.length) % carouselChildren.length;
		}else{
			id = (id < 0)? 0: ((id >= carouselChildren.length)? carouselChildren.length - 1 : id);
		}
		this.setState({	currentId: id});
	}
	render(){
		let carouselChildren = this.props.carouselChildren || [];
		let CurrChild= carouselChildren[this.state.currentId];
		let thumb = this.props.thumb || false;		
		return (
			<div className="carousel">
				<div className="carousel-main" alt="">
				<ReactCSSTransitionGroup transitionName="carouselContent"
						transitionEnterTimeout={500}
						transitionLeave={false}	>
					<CurrChild key={this.state.currentId} />
				</ReactCSSTransitionGroup>
				</div>
				<div className="prev" onClick={this.subCurrent}/>
				<div className="next" onClick={this.addCurrent}/>
				<Footer carouselChildren={carouselChildren} currentId={this.state.currentId} setCurrent={this.setCurrent} dots={carouselChildren.length} thumb={thumb}/>
			</div>
		);
	}
}
Carousel.propTypes = {
  carouselChildren: React.PropTypes.array.isRequired,
  thumb: React.PropTypes.bool,
  loop: React.PropTypes.bool ,
  autoplay: React.PropTypes.number
};

Carousel.defaultProps = {
  carouselChildren: [],
  loop: true
};



export default Carousel;
