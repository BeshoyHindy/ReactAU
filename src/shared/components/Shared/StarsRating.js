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
		this.state.hoverAt = idx + 1;
		this.forceUpdate(); 
	}
	handleMouseOut(idx, evt){
		this.state.hoverAt = null;
		this.forceUpdate();
	}
	handleClick(idx, evt){
		this.state.rating = idx + 1;
		this.forceUpdate();
		this.props.rate(idx + 1);
	}
	render(){
		var stars = [];
		for(var i = 0 ; i < 5; i++){
			var rating = this.state.hoverAt != null ? this.state.hoverAt : this.state.rating;
			var selected = (i < rating);
			stars.push(
			<Star key={i} selected={selected} style={{cursor: "pointer"}}
				onMouseOver={this.handleMouseOver.bind(this, i)}
				onMouseOut={this.handleMouseOut.bind(this, i)}
				onClick={this.handleClick.bind(this, i)}
			/>);
		}
		return (<div  className="rating">  Your Rate: {stars}</div>);
	}
}



export default StarsRating;
