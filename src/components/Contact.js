require('../sass/main.scss');
require("font-awesome-sass-loader");
require.context('../img', true, /\.?/);

import React from 'react';
import { Link} from 'react-router';
class Contact extends React.Component{
		constructor(props) {
			super(props);
		}

		componentWillMount() {
			//console.log('it', this.props.it);

		}

		render() {
			let fronts = ["/img/front1.png"
                      , "/img/front2.png"
                      , "/img/front3.png"];
			return (
<div className="container" >
<div className="row">
    <div className="col-lg-12">
        <ol className="breadcrumb">
            <li><Link to="/home"> Home </Link></li>
            <li className="active">Contact</li>
        </ol>
        <h1 className="page-header">Contact
            <small>We'd Love to Hear From You!</small>
        </h1>
    </div>

    <div className="col-lg-12">
        <iframe width="100%" height="400px" scrolling="no"
                src="http://maps.google.com/maps/ms?ie=UTF8&amp;hl=en&amp;msa=0&amp;msid=106769226832839893040.0004696439a6ad4fbbf77&amp;ll=-33.891997,150.964916&amp;spn=0.003117,0.00456&amp;t=h&amp;z=17&amp;output=embed"></iframe>
    </div>

</div>


<div className="row">
    <div className="col-xs-12">
        <h1 className="page-header"><b>Hi-Tech</b> Digital CCTV</h1>
    </div>
    <div className="col-sm-5 col-md-4">
      <div className="about contact col-xs-12">
        <p>Unit 10/62 Hume Highway, <br/>
            Corner of Knight Street<br/>
            Lansvale 2166 <br/>
            NSW Australia<br/>
        </p>

        <div className="col-xs-12 c">
            <div className="contact-bar col-xs-12">
                <div className="title"><abbr title="Phone"><i className="fa fa-phone"></i></abbr></div>
                <div className="content"> 02 9725 7733</div>
            </div>
            <div className="contact-bar col-xs-12">
                <div className="title"><abbr title="E-mail"><i className="fa fa-envelope-o"></i> </abbr></div>
                <div className="content"> <a href="cctv@hitechdigitalcctv.com.au">info@hitechdigitalcctv.com.au</a></div>
            </div>
            <div className="contact-bar content-bar-hour col-xs-12">
                <div className="title"><abbr title="Hours"><i className="fa fa-clock-o"></i> </abbr></div>
                <div className="content content-hour">  Mon - Fri, 10:00am - 5:00pm<br/>
																				Saturday, 10:00am - 3:00pm<br/>
																				Sunday and Public Holiday Closed
                </div>

            </div>
        </div>
      </div>
    </div>

    <div className="col-sm-7 col-md-8 ">
      <div className="row front-door">
        <div className="col-xs-12 col-md-9 front-door-photo-wrap">
            <div className="front-door-photo">
               <img src={fronts[0]} className="img-responsive ani" />
            </div>
        </div>
        <div className="col-md-3 col-xs-12 front-door-t">
            <ul className="product-thumbs" >
				{fronts.map( (item, id) => {
					return (
						<li key={id}><img src={item}  className="img-responsive" /></li>)
				})}
            </ul>
        </div>
      </div>
    </div>
</div>
</div>
			);
		}

}

export {Contact};
