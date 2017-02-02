import React from 'react';
import Star from './Star';
let StarsRated = (props) => {
	var stars = [];
	let {voteCount, count} = props;
	for(var i = 0 ; i < 5; i++){
		var selected = (i < count);
		var half = (i < count) && ( i > (count - 1)) ;
		stars.push(
		<Star key={i} selected={selected} half={half}/>);
	}
	return (<div  className="rated">Avg Rate: {stars} {`(${count}), ${voteCount} reviews...  `} </div>);
}




export default StarsRated;
