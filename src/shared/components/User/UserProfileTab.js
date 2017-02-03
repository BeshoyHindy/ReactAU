import { connect } from 'react-redux';
import { Link } from 'react-router';
import React from 'react';
import { SortableTbl }  from '../Shared/SortableTbl';
import StarsRated from '../Shared/StarsRated';

const PID = (props) =>
{
	
	return (
		<td style={{width: '170px', minWidth: '170px', backgroundColor: '#fff'}} >
			<Link to={`/products/${props.rowData.cat}/spec/${props.tdData}`}>
				{props.tdData}
			</Link>
		</td>
	);
}

PID.propTypes = {
	rowData:  React.PropTypes.object.isRequired,
	categories:  React.PropTypes.array.isRequired,
	tdData:  React.PropTypes.string.isRequired,
};

const Rate = (props) =>
{
	return (
		<td >
			<StarsRated count={props.tdData}/>
		</td>
	);
}

Rate.propTypes = {
	rowData: React.PropTypes.object.isRequired,
	tdData:  React.PropTypes.number.isRequired,
};

let UserProfileTab = (props) => {
	let {user,categories} = props;
	let data = [];
	if (user.data && user.data.rate && categories){
		data = user.data.rate.map((item)=> { 
			let cat = categories.filter((catItem) => {return catItem._id===parseInt(item.cat) ;});
			cat = (cat && cat.length > 0 && cat[0].categoryName) || "Unknown";
			return {pid: item.productId, rate: item.rate, cat}
		});
	}
	return (
		<div className="well user-info">
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
			{ 
				user.data && user.data.rate && categories &&
				<SortableTbl categories={categories} tblData={data}
					tHead={ [  "Product ID", "Product Type", "Rate"]}
					customTd={[
								{custd: PID, keyItem: "pid"},
								{custd: Rate, keyItem: "rate"},
							]}
					dKey={["pid", "cat", "rate"]}/>		
			}
		</div>
	)
}; 

UserProfileTab.propTypes = {
	user:  React.PropTypes.object.isRequired,
	categories:  React.PropTypes.array.isRequired,
};

function mapStateToProps(state, ownProps) {
  return {
	user: state.auth.user,
    categories: state.categories,		
  };
}
UserProfileTab = connect(mapStateToProps)(UserProfileTab);


export default UserProfileTab;


	
