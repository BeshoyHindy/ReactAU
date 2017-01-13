const navData = [
	{name: "home", link: "/home", desc: "Home"},
	{name: "products", link: "/products", desc: "Products"
		, sub: [
			{name: "DVR", link: "/products/DVR/All", desc: "DVR", sub:[
					{name: "HD-SDI", link:"/products/DVR/HD-SDI", desc:"HD-SDI"},
					{name: "HD-TVI", link:"/products/DVR/HD-TVI", desc:"HD-TVI"},
					{name: "AHD", link:"/products/DVR/AHD", desc:"AHD"},
					{name: "Analog", link:"/products/DVR/Analog", desc:"Analog"}
				]
			},
			{name: "KIT", link: "/products/KIT/All", desc: "Kit"},
			{name: "NVR", link: "/products/NVR/All", desc: "NVR"},
			{name: "CCTV", link: "/products/CCTV/All", desc: "CCTV Camera", sub:[
					{name: "HD-SDI", link:"/products/CCTV/HD-SDI", desc:"HD-SDI"},
					{name: "HDTVI", link:"/products/CCTV/HD-TVI", desc:"HD-TVI"},
					{name: "AHD", link:"/products/CCTV/AHD", desc:"AHD"},
					{name: "Analog", link:"/products/CCTV/Analog", desc:"Analog"},
					{name: "IP", link:"/products/CCTV/IP", desc:"IP"}
				]
			},
			{name: "ALARM", link: "/products/ALARM/All", desc: "Instrusion Alarm"},
			{name: "INTERCOM", link: "/products/INTERCOM/All", desc: "Video Intercom"}
		]},
	{name: "aboutus", link: "/aboutus", desc: "About Us"},
	{name: "contact", link: "/contact", desc: "Contact"}
];

const validProduct = ["DVR", "NVR", "KIT", "CCTV", "INTERCOM", "ALARM"];
const validProductType = ["All", "HD-SDI", "HD-TVI", "AHD", "Analog", "IP"];
const validProductBrand = ["All", "Samsung", "iCATCH", "SNM", "DigiGuard", "BOSCH", "Futuro", "Honeywell", "KCE", "Secuzone", "Hikvision"];
const routeBaseLink = validProduct.reduce(
	(acc,cur) =>{ return Object.assign({}, acc, {[cur]: ("/products/" + cur + "/spec/") });}
	, {}
);

function isvalidProductType(value){
	return validProductType.indexOf(value) !== -1 || validProductBrand.indexOf(value)  !== -1;
}

function isvalidProduct(value){
	return validProduct.indexOf(value) !== -1 ;
}

function isvalidRoute(product, type){
	type = type || 'All';
	//console.log(product, type, isvalidProduct(product) && isvalidProductType(type));
	return isvalidProduct(product) && isvalidProductType(type);
}

export {navData, isvalidRoute, routeBaseLink};
