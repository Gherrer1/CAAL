var request = require('request');
var fs = require('fs');

const [inputEmailHandle, inputPassword] = fs.readFileSync('creds.txt').toString().split('\n').map(c => c.trim());
const [url, Referer] = fs.readFileSync('request_config.txt').toString().split('\n').map(c => c.trim());


var form = { inputEmailHandle, inputPassword };
var options = {
	url,
	headers: {
		Referer
	},
	form
	// jar: true // for cookies
};
request.post(options, function(err, response, body) {
	debugger;
	if(!err) {
		var cookies = response && response.headers && response.headers['set-cookie'];
		var session = cookies && cookies[0].split('=')[1];
		console.log(`heres your cookie: ${session}`);	
	}
})