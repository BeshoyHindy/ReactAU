import React from 'react';

let Star = (props) => {
	let r = 'fa fa-star';
	if(!props.selected){
		r += '-o';
	}else if (props.half){
		r += "-half-o";
	}
	return (
		<i onMouseOver={props.onMouseOver} onMouseOut={props.onMouseOut} onClick={props.onClick} 
			className={r} style={{color: "#ffd700"}}/>
	);
};
Star.propTypes = {
	selected: React.PropTypes.bool,
	half: React.PropTypes.bool
};

Star.defaultProps = {
	selected: false,
	half: false
};

export default Star;
