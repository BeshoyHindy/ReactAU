import React from 'react';

class Star extends React.Component{
	constructor(props) {
		super(props);
		this.onMouseOver = this.onMouseOver.bind(this);
		this.onMouseOut = this.onMouseOut.bind(this);
		this.onClick = this.onClick.bind(this);
	}
	onMouseOver(e){
		this.props.MouseOver(this.props.id);
	}
	onMouseOut(e){
		this.props.MouseOut(this.props.id);
	}
	onClick(e){
		this.props.Click(this.props.id);
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
	MouseOver: React.PropTypes.func,
	MouseOut: React.PropTypes.func,
	Click: React.PropTypes.func,
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
