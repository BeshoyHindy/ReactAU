function renderFullPage(component,initialState){
var vendorFile = (process.env.NODE_ENV === 'production')
					?"/vendor.js"
					:"/dll/dll.vendor.js";

 return `<!doctype html>
		<html>
			<head>
			 <title>Hi-Tech Digital CCTV</title>
  				<link href="https://fonts.googleapis.com/css?family=Lato|Oswald:400,700|Rajdhani|Ubuntu" rel="stylesheet">
				<link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css" />
				<link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css" />			 
       			<link rel="stylesheet" href="/css/main.css">	   
			</head>
			<body>
				<div id="rootWrap">${component}</div>
				<script>
					window.__INITIAL_STATE__ = ${JSON.stringify(initialState)}
				</script>
				<script src="${vendorFile}"></script>
				<script src="/bundle.js"></script>
			</body>
		</html>
   `
}
module.exports = renderFullPage;