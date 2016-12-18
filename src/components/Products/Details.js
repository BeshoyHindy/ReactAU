require('../../sass/main.scss');
require("font-awesome-sass-loader");
require.context('../../img', true, /\.?/);

import { Link} from 'react-router';
import React from 'react';
import axios from 'axios';
import { CommonDetails } from './CommonDetails';
import { AlarmDetails } from './AlarmDetails';

const Details = (props) =>
{
	if (props.params.product === 'ALARM'){
		return ( <AlarmDetails {...props}/>);
	}else{
		return ( <CommonDetails {...props}/>);
	}
};


Details.propTypes = {
	params: React.PropTypes.object,
};

export {Details};
