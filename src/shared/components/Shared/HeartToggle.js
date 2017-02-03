import React from 'react';

class HeartToggle extends React.Component{
	constructor(props) {
		super(props);
		this.state ={
			select: props.init
		};
		this.handleClick = this.handleClick.bind(this);
	}
	handleClick(evt){
		let nSelect = !this.state.select;
		this.setState((state, props) => { return { select: nSelect };});
		this.props.selectIt && this.props.selectIt(nSelect);
	}	
	render(){	
		let r = 'fa fa-heart';
		if(!this.state.select){
			r += '-o';
		}
		return (
			<i onClick={this.handleClick} className={r} style={{color: "#CC3300"}}/>
		);
	}
}

HeartToggle.propTypes = {
	init: React.PropTypes.bool,
	selectIt: React.PropTypes.func,
};

HeartToggle.defaultProps = {
	init: false,
};

export default HeartToggle;
