module.exports = 
{
	api_server:
	{
		http: 
		{
			host: 'https://node-api-server-chingching.herokuapp.com',
			//host: 'http://localhost',
			//port: 3003,
			port: 443
		}
	},
	web_server: 
	{
		http: 
		{
			host: 'localhost',
			port: process.env.PORT || 3000,
		}
	},
	session_secret_keys: ['chingchingyeh'],
	development:
	{
		webpack:
		{
			development_server:
			{
				host: 'localhost',
				port: 3002
			}
		}
	}
}