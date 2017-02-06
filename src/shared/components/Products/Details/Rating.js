import { connect } from 'react-redux';
import React from 'react';

import * as modalActions from '../../../actions/modalAction';
import * as userActions from '../../../actions/userAction';
import StarsRating from '../../Shared/StarsRating';
import StarsRated from '../../Shared/StarsRated';


class Rating extends React.Component{
	constructor(props) {
		super(props);
		this.signin = this.signin.bind(this);
		this.rate = this.rate.bind(this);
	}

	signin(){
		this.props.changeModal({open:true});
	}
	rate(rate){
		this.props.setUserProductRate({id:this.props.id, rate});
	}
	render(){
		let {stars, auth, id} = this.props;
		let c = Math.round((stars.totalStars / stars.voteCount) * 100) / 100;
		c = isNaN(c)?0:c; 

		let rate = <input type="button" className="btn btn-warning rating" value="Rate it" onClick={this.signin}/>;
		if (auth && auth.success ){
			let nRate = auth.user.data.rate.filter(function (rate) {
				return rate.productId === id;
			})[0];
			let userRate = (nRate && nRate.rate) || 0;			
			rate = <StarsRating id={id} rate={this.rate} initRate={userRate}/>;
		}

		return (
			<div className="rate">
				<StarsRated pretitle="Avg Rate:" count={c} voteCount={stars.voteCount}/>
				{rate}
			</div>
		);
	}
}

Rating.propTypes = {
	stars: React.PropTypes.object,
};
Rating.defaultProps = {
	stars: {avgRate : 0, voteCount: 0},
};

function mapStateToProps(state) {
  return { 
    auth: state.auth,
	stars:state.details.stars,
	id:	state.details._id
  };
}


export default Rating = connect(mapStateToProps,  {...modalActions, ...userActions})(Rating);

							