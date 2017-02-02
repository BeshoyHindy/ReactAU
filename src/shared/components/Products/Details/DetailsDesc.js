import React from 'react';
import { SpecTbl }  from './Spec';
import { SortableTbl }  from '../../Shared/SortableTbl';
import {CustomDownloadTd} from '../../Shared/Shared';
import  Rating  from './Rating';


const DetailsDesc = (props) => {

	return (
		<div>
			<h1>{props.data.name}</h1>
			<Rating/>
			<div className="p-desc-detail">
				<ul className="fa-ul">
					{props.data.description && props.data.description.map( (item, id) => {
						return (
						<li key={id}><i className="fa-li fa fa-check-square"/>{item}</li>
						);
					})}
				</ul>
			</div>
		</div>
	);
};
DetailsDesc.propTypes = {
	data: React.PropTypes.object
};

export {DetailsDesc};
