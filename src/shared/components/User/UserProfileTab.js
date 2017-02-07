import { connect } from 'react-redux';
import { Link } from 'react-router';
import React from 'react';
import { SortableTbl }  from '../Shared/SortableTbl';
import { BigHeader} from "../Shared/Shared";
import StarsRated from '../Shared/StarsRated';


let UserProfileTab = (props) => {
	let {user,categories} = props;
	let data = [];
	if (user.data && user.data.rate && categories){
		data = user.data.rate.map((item)=> { 
			let cat = categories.filter((catItem) => {return catItem._id===parseInt(item.cat) ;});
			cat = (cat && cat.length > 0 && cat[0].categoryName) || "Unknown";
			return {pid: item.productId, rate: item.rate, cat};
		});
	}
	return (
		<div className="user-info">
			<BigHeader smallTitle="">Basic Info</BigHeader>
			<table className="table table-striped table-bordered table-hover p-spec">
				<tbody>
					<tr>
						<td>Field</td>
						<td>Data</td>
					</tr>
					<tr>
						<td>User Name</td>
						<td>{user && user.profile && user.profile.username}</td>
					</tr>
					<tr>
						<td>User E-Mail</td>
						<td>{user && user.email }</td>
					</tr>
					<tr>
						<td>User Total Purchase </td>
						<td>{user && user.data && user.data.totalValue}</td>
					</tr>
				</tbody>
			</table>
		</div>
	);
}; 

UserProfileTab.propTypes = {
	user:  React.PropTypes.object.isRequired,
	categories:  React.PropTypes.object,
};

function mapStateToProps(state, ownProps) {
  return {
	user: state.auth.user || {},
  };
}
UserProfileTab = connect(mapStateToProps)(UserProfileTab);


export default UserProfileTab;


	
