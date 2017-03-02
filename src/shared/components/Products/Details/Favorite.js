import { connect } from 'react-redux';
import React from 'react';

import * as modalActions from '../../../actions/modalAction';
import * as userActions from '../../../actions/userAction';
import HeartToggle from '../../Shared/HeartToggle';


let Favorite = class Favorite extends React.Component{
	constructor(props) {
		super(props);
		this.save = this.save.bind(this);
	}

	save(love){
		let {auth, id, changeModal, setUserFavorite} = this.props;
		if (!auth || !auth.success ){
			return changeModal({open:true});
		}
		setUserFavorite({love, id});
	}
	render(){
		let {favorite, auth, id, short} = this.props;
		let init = false;
		if (auth && auth.success ){
			init = !!auth.user.data.favorite.filter(function (item) {
				return item.productId === id;
			}).length;
		}
		let desc = favorite || '';
		if (!short){
			desc = favorite && `${favorite} ${favorite===1?"person":"people"} love`;
		}
		return (
			<div className="favorite">
				<HeartToggle selectIt={this.save} init={init}/> {desc}
			</div>
		);
	}
};

Favorite.propTypes = {
	favorite: React.PropTypes.number,
	short: React.PropTypes.bool,
	auth: React.PropTypes.object,
	id: React.PropTypes.string,	
	changeModal: React.PropTypes.func.isRequired,	
	setUserFavorite: React.PropTypes.func.isRequired,	
};
Favorite.defaultProps = {
	favorite: 0,
	short: false,
};

function mapStateToProps(state) {
  return { 
    auth: state.auth,
	favorite:state.details.favorite || 0,
	id:	state.details._id
  };
}


export default Favorite = connect(mapStateToProps,  {...modalActions, ...userActions})(Favorite);

							