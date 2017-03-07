import { Link} from 'react-router';
import React from 'react';
import {navData } from '../../../Data/RouteData';

const ProductIndexSidebar = () => (
	<div>
		<div className="col-sm-12 cat">
			<ul ><li>Products:
					<ul>
					{
						navData.filter((item)=> { return item.name === "products"; })
							.reduce( (result,item) => { return item; }, {})
							.sub.map((item, id) => { return (<li key={id}><Link to={item.link}>{item.desc}</Link></li>); })
					}
					</ul>
				</li>
			</ul>
		</div>
	</div>
);
ProductIndexSidebar.propTypes = {
};


export default ProductIndexSidebar;
