import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import React from 'react';
import { SortableTbl }  from '../Shared/SortableTbl';
import { BigHeader} from "../Shared/Shared";
import StarsRated from '../Shared/StarsRated';
import HeartToggle from '../Shared/HeartToggle';

const PID = (props) =>
{

	return (
		<td style={{minWidth: '120px', backgroundColor: '#fff'}} >
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

const Fav = (props) =>
{
	return (
		<td >
			<HeartToggle init={true}/>
		</td>
	);
};

Fav.propTypes = {
	rowData: React.PropTypes.object.isRequired,
	tdData:  React.PropTypes.number.isRequired,
};

let FavoriteProductTab = (props) => {
	let {user,categories} = props;
	let data = [];
	if (user.data && user.data.favorite && categories){
		data = user.data.favorite.map((item)=> {
			let cat = categories.filter((catItem) => {return catItem._id===parseInt(item.cat) ;});
			cat = (cat && cat.length > 0 && cat[0].categoryName) || "Unknown";
			return {pid: item.productId, fav: 1, cat};
		});
	}
	return (
		<div className="user-info">
			{
				user.data && user.data.favorite && categories &&
				<div>
					<BigHeader smallTitle="">My Favorite Products</BigHeader>
					<SortableTbl categories={categories} tblData={data}
						tHead={[  "Product ID", "Product Type", "Favorite"]}
						customTd={[
									{custd: PID, keyItem: "pid"},
									{custd: Fav, keyItem: "fav"},
								]}
						dKey={["pid", "cat", "fav"]}/>
				</div>
			}
		</div>
	);
};

FavoriteProductTab.propTypes = {
	user:  React.PropTypes.object.isRequired,
	categories:  React.PropTypes.array,
};

function mapStateToProps(state, ownProps) {
  return {
	user: state.auth.user || {},
    categories: state.categories,
  };
}
FavoriteProductTab = connect(mapStateToProps)(FavoriteProductTab);


export default FavoriteProductTab;



