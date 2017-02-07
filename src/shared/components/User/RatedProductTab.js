import { connect } from 'react-redux';
import { Link } from 'react-router';
import React from 'react';
import { SortableTbl }  from '../Shared/SortableTbl';
import { BigHeader} from "../Shared/Shared";
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
};

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
};

Rate.propTypes = {
	rowData: React.PropTypes.object.isRequired,
	tdData:  React.PropTypes.number.isRequired,
};

let RatedProductTab = (props) => {
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
			{ 
				user.data && user.data.rate && categories &&
				<div> 
					<BigHeader smallTitle="">My Rated Products</BigHeader>
					<SortableTbl categories={categories} tblData={data}
						tHead={[  "Product ID", "Product Type", "Rate"]}
						customTd={[
									{custd: PID, keyItem: "pid"},
									{custd: Rate, keyItem: "rate"},
								]}
						dKey={["pid", "cat", "rate"]}/>		
				</div>
			}
		</div>
	);
}; 

RatedProductTab.propTypes = {
	user:  React.PropTypes.object.isRequired,
	categories:  React.PropTypes.array,
};

function mapStateToProps(state, ownProps) {
  return {
	user: state.auth.user || {},
    categories: state.categories,		
  };
}
RatedProductTab = connect(mapStateToProps)(RatedProductTab);


export default RatedProductTab;


	
