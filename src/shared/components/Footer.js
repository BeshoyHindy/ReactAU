import { contactData} from '../Data/ContactData';
import { PureList} from "./Shared/Shared";
import React from 'react';

const FooterContactDetail = (props) => (
            <li className="">
                <i className={props.iconClass} /> | {
                        (props.link)?(  <a href={props.link}> <PureList data={props.content}/> </a>)
                                    :( <PureList data={props.content}/>)
                    }
            </li>
);
FooterContactDetail.propTypes = {
  link: React.PropTypes.string,
  content: React.PropTypes.array.isRequired,
  iconClass: React.PropTypes.string,
  title: React.PropTypes.string
};

const Footer = (props) => (
<div id="footer">
			<div className="copyright">
				COPYRIGHT (C) 2017 HI-TECH DIGITAL CCTV PTY., LTD. ALL RIGHTS RESERVED.
			</div>
			<div className="info">				
				<ul>					
					{  contactData.map((item ,id) => ( item.iconClass) && ( <FooterContactDetail key={id} {...item}/> )       )     }
					<li><i className="fa fa-home" aria-hidden="true"></i> | {contactData.map((item ,id) => (item.title === "Address") && <PureList key={id} data={item.content}/>  )}</li>
				</ul>
			</div>
</div>)

export default Footer;
