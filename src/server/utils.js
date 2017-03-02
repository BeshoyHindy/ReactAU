/* eslint import/no-unresolved: 0*/

//import Promise     from 'bluebird';
import geoip       from 'geoip-lite';
import strformat   from 'strformat';


// import clientConfig              from '../shared/config';
// import { getSupportedLocales }   from '../shared/utils';

export function fetchComponentsData({ dispatch, components, params, query, locale, route, device }) {
    const promises = components.map(current => {
        //console.log(current);
		if (!current)  return null;
        const component = current.WrappedComponent ? current.WrappedComponent : current;
        
        return component.fetchData
            ? component.fetchData({ dispatch, params, query, locale, route, device })
            : null;
    });

    return Promise.all(promises);
}

export function getMetaDataFromState({ route, state, params = {}, query = {}, lang, pathname }) {
    /* eslint more/no-duplicated-chains: 0 */
    if (route === 'aboutus' ) {
        return {
            type        : 'ABOUTUS',
            title       : "About Us",
            siteName    : "Hi-Tech Digital CCTV",
            image       : '/img/ASIALmemberjpeg_hires.jpg',
            description : `At Hi-Tech Digital CCTV, our aim is to provide you with professional advice through our experience to satisfy all your security surveillance needs through our friendly services. We will only provide you with products of the highest quality for your surveillance soultion and will continue to provide an ongoing reliable support.
			Our products are predominantly Made in Taiwan and Made in Korea to ensure the best of its quality while still maintaining an affordable price.
			To meet all your needs, we endeavour to explain all the functions and features of our products until you understand them clearly before you make any decisions. We will continue to provide friendly services and reliable support to our customers to ensure the best results can be obtained from our products.| Sunday | Australia | DVR | NVR | CCTV Camera | Instrusion Alarm | Video Intercom | Kit.`,
			pathname: `https://react-redux-demo-chingching.herokuapp.com${pathname}`
        };
    }

    if (route === ':ProductsTbl' ) {
        return {
            type        : 'PRODUCT_TYPE',
            title 		: `Products|${params.product}|${params.ProductsTbl}`,
            siteName    : "Hi-Tech Digital CCTV",
            image       : '/img/snap1.png',
            description : `The page provide all info for ${params.product} ${params.ProductsTbl}. At Hi-Tech Digital CCTV, our aim is to provide you with professional advice through our experience to satisfy all your security surveillance needs through our friendly services. We will only provide you with products of the highest quality for your surveillance soultion and will continue to provide an ongoing reliable support.
			Our products are predominantly Made in Taiwan and Made in Korea to ensure the best of its quality while still maintaining an affordable price.
			To meet all your needs, we endeavour to explain all the functions and features of our products until you understand them clearly before you make any decisions. We will continue to provide friendly services and reliable support to our customers to ensure the best results can be obtained from our products.| Sunday | Australia`,
			pathname: `https://react-redux-demo-chingching.herokuapp.com${pathname}`
        };
    }
    if (route === 'spec/:id' ) {
		let desc = state.details.description.reduce((prev, next)=> {return prev + next;});
		let image = state.details.images[0] || '/img/front1.png';
        return {
            type        : 'PRODUCT_DETAILS',
            title 		: `Products Details|${params.product}|${params.id.toUpperCase()}|${state.details.brand}|${state.details.name}`,
            siteName    : "Hi-Tech Digital CCTV",
            image       : `${image}`,
            description : `Products Details|${params.product}|${params.id.toUpperCase()}|${state.details.brand}|${state.details.name}. Feature: ${desc}. At Hi-Tech Digital CCTV, our aim is to provide you with professional advice through our experience to satisfy all your security surveillance needs through our friendly services. We will only provide you with products of the highest quality for your surveillance soultion and will continue to provide an ongoing reliable support.
			Our products are predominantly Made in Taiwan and Made in Korea to ensure the best of its quality while still maintaining an affordable price. 
			To meet all your needs, we endeavour to explain all the functions and features of our products until you understand them clearly before you make any decisions. We will continue to provide friendly services and reliable support to our customers to ensure the best results can be obtained from our products.| Sunday | Australia `,
			pathname: `https://react-redux-demo-chingching.herokuapp.com${pathname}`
        };
    }

    if (route === 'contact') {
            return {
                type        : 'CONTACT',
                title       : "Contact",
                siteName    : 'Hi-Tech Digital CCTV',
                image       : '/img/front1.png',
                description :  "Unit 10/62 Hume Highway, Corner of Knight Street, Lansvale 2166, NSW Australia. 02 9725 7733. email: info@hitechdigitalcctv.com.au, Work Days: Mon - Fri, 10:00am - 5:00pm, Saturday: 10:00am - 3:00pm, Sunday and Public Holiday Closed. | Sunday | Australia | DVR | NVR | CCTV Camera | Instrusion Alarm | Video Intercom | Kit",
				pathname: `https://react-redux-demo-chingching.herokuapp.com${pathname}`
            };
 
    }

    if (route === 'productChange/:id') {
            return {
                type        : 'ADMIN',
                title       : "Admin - Change Product",
                siteName    : 'Hi-Tech Digital CCTV',
                image       : '/img/banner1.png',
                description :  "",
				pathname: `https://react-redux-demo-chingching.herokuapp.com${pathname}`
            };

    }
    if (route === 'productList/:cat') {
            return {
                type        : 'ADMIN',
                title       : "Admin - Product List",
                siteName    : 'Hi-Tech Digital CCTV',
                image       : '/img/banner1.png',
                description :  "",
				pathname: `https://react-redux-demo-chingching.herokuapp.com${pathname}`
            };

    }
    if (route === 'addUser') {
            return {
                type        : 'ADMIN',
                title       : "Admin - Add User",
                siteName    : 'Hi-Tech Digital CCTV',
                image       : '/img/banner1.png',
                description :  "",
				pathname: `https://react-redux-demo-chingching.herokuapp.com${pathname}`
            };

    }

    return {
        type        : 'MAIN',
        title       : 'Home',
        siteName    : 'Hi-Tech Digital CCTV',
        image       : '/img/banner1.png',
        description : `At Hi-Tech Digital CCTV, our aim is to provide you with professional advice through our experience to satisfy all your security surveillance needs through our friendly services. We will only provide you with products of the highest quality for your surveillance soultion and will continue to provide an ongoing reliable support.
			Our products are predominantly Made in Taiwan and Made in Korea to ensure the best of its quality while still maintaining an affordable price.
			To meet all your needs, we endeavour to explain all the functions and features of our products until you understand them clearly before you make any decisions. We will continue to provide friendly services and reliable support to our customers to ensure the best results can be obtained from our products.| Sunday | Australia | DVR | NVR | CCTV Camera | Instrusion Alarm | Video Intercom | Kit`,
		pathname: `https://react-redux-demo-chingching.herokuapp.com${pathname}`
    };
}


export function getIp(req) {
    return req.headers['x-forwarded-for'] || req.headers['x-real-ip'] || req.connection.remoteAddress;
}

export function detectLocale(req) {
    // // Take locale passed by account
    // const passedLocale = (req.query.locale || req.cookies.locale || '').toLowerCase();

    // // if (getSupportedLocales().indexOf(passedLocale) >= 0) {
    //     return passedLocale;
    // // }

    // // Detect locale by ip
    const ip = getIp(req);
    const geo = geoip.lookup(ip);
    const country = (geo && geo.country);

    return {
        UA: 'uk',
        RU: 'ru',
        TR: 'tr'
    }[country] || 'en';
}

function _getGreeting(assessmentSystem, score) {
    for (let i = assessmentSystem.length - 1; i >= 0; i--) {
        if (score >= assessmentSystem[i].grade) {
            return {
                phrase: assessmentSystem[i].phrase,
                description: assessmentSystem[i].description || ''
            };
        }
    }
}
