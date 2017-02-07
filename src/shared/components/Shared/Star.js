import React from 'react';

class Star extends React.Component{
	constructor(props) {
		super(props);
		this.onMouseOver = this.onMouseOver.bind(this);
		this.onMouseOut = this.onMouseOut.bind(this);
		this.onClick = this.onClick.bind(this);
	}
	onMouseOver(e){
		this.props.onMouseOver(this.props.id, e);
	}
	onMouseOut(e){
		this.props.onMouseOut(this.props.id, e);
	}
	onClick(e){
		this.props.onClick(this.props.id, e);
	}
	render(){	
		let {selected, half} = this.props;
		let r = 'fa fa-star';
		if(!selected){
			r += '-o';
		}else if (half){
			r += "-half-o";
		}
		return (
			<i onMouseOver={this.onMouseOver} onMouseOut={this.onMouseOut} onClick={this.onClick} 
				className={r} style={{color: "#ffd700"}}/>
		);
	}
}
Star.propTypes = {
	selected: React.PropTypes.bool,
	onMouseOver: React.PropTypes.func,
	onMouseOut: React.PropTypes.func,
	onClick: React.PropTypes.func,
	half: React.PropTypes.bool,
	id: React.PropTypes.number
};

Star.defaultProps = {
	selected: false,
	half: false,
	onMouseOver: ()=>{},
	onMouseOut:  ()=>{},
	onClick:  ()=>{},
};

export default Star;
