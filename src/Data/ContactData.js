const contactData = 
[
	{
		title:"Phone", iconClass:"fa fa-phone", content:["02 9725 7733"], contentClass:"content"
	},
	{
		title:"E-mail", iconClass:"fa fa-envelope-o", content:["info@hitechdigitalcctv.com.au"], 
		contentClass:"content", link:"info@hitechdigitalcctv.com.au"
	},
	{
		title:"Hours", iconClass:"fa fa-clock-o", 
		content:["Mon - Fri, 10:00am - 5:00pm",
				"Saturday, 10:00am - 3:00pm",
				"Sunday and Public Holiday Closed"], 
		contentClass:"content content-hour"
	},
	{
		title:"Address",
		content: [
		    "Unit 10/62 Hume Highway, ",
            "Corner of Knight Street",
            "Lansvale 2166 ",
            "NSW Australia",
		]
	}	
];

const frontImgData = ["/img/front1.png"
               , "/img/front2.png"
               , "/img/front3.png"];

const gMapLinkData = 
"http://maps.google.com/maps/ms?ie=UTF8&hl=en&msa=0&msid=106769226832839893040.0004696439a6ad4fbbf77&ll=-33.891997,150.964916&spn=0.003117,0.00456&t=h&z=17&output=embed"

export {contactData, frontImgData, gMapLinkData};
