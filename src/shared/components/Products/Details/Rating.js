import { connect } from 'react-redux';
import React from 'react';

import * as modalActions from '../../../actions/modalAction';
import StarsRating from '../../Shared/StarsRating';
import StarsRated from '../../Shared/StarsRated';


class Rating extends React.Component{
	constructor(props) {
		super(props);
		this.signin = this.signin.bind(this);
	}

	signin(){
		this.props.changeModal({open:true});
	}
	render(){
		let {stars, auth} = this.props;
		let rate = <input type="button" className="btn btn-warning rating" value="Rate it" onClick={this.signin}/>;
		if (auth && auth.success )
			rate = <StarsRating/>;

    	return (
			<div className="rate">
				<StarsRated count={stars.avgRate} voteCount={stars.voteCount}/>
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
  };
}


export default Rating = connect(mapStateToProps,  {...modalActions})(Rating);

							