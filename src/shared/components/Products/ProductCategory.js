import React from 'react';

const ProductCategory = (props) => (
	<div>
		{
			(props.children)
				? (<div> {React.cloneElement(props.children, props)} </div>)
				: (<div/>)
		}
	</div>
);
ProductCategory.propTypes = {
	children: React.PropTypes.node
};

export {ProductCategory};
