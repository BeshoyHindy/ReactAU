import React from 'react';
import { Link} from 'react-router';
import ImageLoader from 'react-imageloader';

import { Breadcrumb , BigHeader, PureList, GoogleMap} from "./Shared/Shared";
import { contactData, frontImgData, gMapLinkData} from '../Data/ContactData';
import {ImageList} from './Shared/ImageList';

function FrontImgpreloader() {
	return <div className="loading-div" style={{minHeight: "368px"}}/>;
}

const ContactDetail = (props) => (
            <div className="contact-bar">
                <div className="title"><abbr title={props.title}><i className={props.iconClass} /> </abbr></div>
                <div className="content">
                    {
                        (props.link)?(  <a href={props.link}>   <PureList data={props.content}/> </a>)
                                    :( <PureList data={props.content}/>)
                    }
                </div>
            </div>
);
ContactDetail.propTypes = {
  link: React.PropTypes.string,
  content: React.PropTypes.array.isRequired,
  iconClass: React.PropTypes.string,
  title: React.PropTypes.string
};



const ContactBoard = (props) => (
    <div>
		{
			props.contactData.map((item ,id) => (item.title === "Address") && <PureList key={id} data={item.content}/>  )
		}
        <div className="col-xs-12 c">
            {  props.contactData.map((item ,id) => ( item.iconClass) && ( <ContactDetail key={id} {...item}/> )       )     }
        </div>
    </div>
);
ContactBoard.propTypes = {
  contactData: React.PropTypes.array
};


const ContactPage = (props) => {
    return (
        <div className="container" >
            <div className="row">
                <div className="col-lg-12">
                    <Breadcrumb linkPair={[{link:"/home", desc:"Home"},{link:"", desc:"Contact"}]}/>
                    <BigHeader smallTitle="We'd Love to Hear From You!">Contact</BigHeader>
                </div>

                <div className="col-lg-12">
                    <GoogleMap link={gMapLinkData} />
                </div>

            </div>
            <div className="row">
                <div className="col-xs-12">
                    <BigHeader smallTitle=""><b>Hi-Tech</b> Digital CCTV</BigHeader>
                </div>
                <div className="col-sm-5 col-md-4">
                <div className="about contact col-xs-12">
                    <ContactBoard contactData={contactData}/>
                </div>
                </div>

                <div className="col-sm-7 col-md-8 ">
                <div className="row front-door">
                    <div className="col-xs-12 col-md-9 front-door-photo-wrap">
                        <div className="front-door-photo">
                            <ImageLoader
                                src={frontImgData[0]}
                                wrapper={React.DOM.div}
                                preloader={FrontImgpreloader}>NOT FOUND
                            </ImageLoader>
                        </div>
                    </div>
                    <div className="col-md-3 col-xs-12 front-door-t">
                        <ul className="product-thumbs" >
                            {
                                frontImgData.map( (item, id) => ( <ImageList key={id} src={item} loaderStyle={{minHeight: "120px"}}/>))
                            }
                        </ul>
                    </div>
                </div>
                </div>
            </div>
        </div>
    );
}

export {ContactPage};