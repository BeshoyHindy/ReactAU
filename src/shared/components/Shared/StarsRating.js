import React from 'react';
import Star from './Star';

class StarsRating extends React.Component{
	constructor(props) {
		super(props);
		this.state ={
			rating: props.initRate, 
			hoverAt: null
		};
		this.handleMouseOver = this.handleMouseOver.bind(this);
		this.handleMouseOut = this.handleMouseOut.bind(this);
		this.handleClick = this.handleClick.bind(this);
	}
	handleMouseOver (idx, evt){
		this.setState((state, props) => { return { hoverAt: idx + 1 };});
		
		// this.state.hoverAt = idx + 1;
		// this.forceUpdate(); 
	}
	handleMouseOut(idx, evt){
		this.setState((state, props) => { return { hoverAt: null };});

		// this.state.hoverAt = null;
		// this.forceUpdate();
	}
	handleClick(idx, evt){
		this.setState((state, props) => { return { rating: idx + 1 };});

		// this.state.rating = idx + 1;
		// this.forceUpdate();
		this.props.rate(idx + 1);
	}
	render(){
		let stars = [];
		for(let i = 0 ; i < 5; i++){
			let rating = this.state.hoverAt != null ? this.state.hoverAt : this.state.rating;
			let selected = (i < rating);
			stars.push(
			<Star key={i} id={i} selected={selected} style={{cursor: "pointer"}}
				onMouseOver={this.handleMouseOver}
				onMouseOut={this.handleMouseOut}
				onClick={this.handleClick}
			/>);
		}
		return (<div  className="rating">  Your Rate: {stars}</div>);
	}
}

StarsRating.propTypes = {
	initRate: React.PropTypes.number.isRequired,
	rate: React.PropTypes.func.isRequired,
};

export default StarsRating;
