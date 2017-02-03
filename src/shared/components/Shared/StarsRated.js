import React from 'react';
import Star from './Star';
let StarsRated = (props) => {
	let stars = [];
	let {voteCount, count, pretitle} = props;
	pretitle = pretitle || "";
	voteCount && (voteCount = `${voteCount} reviews...  `);
	for(let i = 0 ; i < 5; i++){
		let selected = (i < count);
		let half = (i < count) && ( i > (count - 1)) ;
		stars.push(
		<Star key={i} selected={selected} half={half}/>);
	}
	return (<div  className="rated">{pretitle} {stars} ({count}) {voteCount} </div>);
}

export default StarsRated;
