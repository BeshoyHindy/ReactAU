module.exports =
{
	api_server:
	{
		http:
		{
			// host: 'https://node-api-server-chingching.herokuapp.com',
			// port: 443,
			host: 'http://localhost',
			port: 3003,
		}
	},
	web_server:
	{
		http:
		{
			host: 'http://localhost',
			port: process.env.PORT || 3000, // process.env.PORT is need for heroku
		}
	},
	webpack_dev_server:
	{
		http:
		{
			host: 'http://localhost',
			port: 3002,
		}
	}
}
