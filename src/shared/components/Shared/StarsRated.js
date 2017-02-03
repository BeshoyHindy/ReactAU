import React from 'react';
import Star from './Star';
let StarsRated = (props) => {
	var stars = [];
	let {voteCount, count, pretitle} = props;
	pretitle = pretitle || "";
	voteCount && (voteCount = `${voteCount} reviews...  `);
	for(var i = 0 ; i < 5; i++){
		var selected = (i < count);
		var half = (i < count) && ( i > (count - 1)) ;
		stars.push(
		<Star key={i} selected={selected} half={half}/>);
	}
	return (<div  className="rated">{pretitle} {stars} ({count}) {voteCount} </div>);
}




export default StarsRated;
