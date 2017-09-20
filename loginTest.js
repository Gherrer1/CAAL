var request = require('request');
var fs = require('fs');
var publish = require('./publishTest');

const [inputEmailHandle, inputPassword] = fs.readFileSync('creds.txt').toString().split('\n').map(c => c.trim());
const [url, Referer] = fs.readFileSync('request_config.txt').toString().split('\n').map(c => c.trim());


function authenticate() {
	return new Promise(function(resolve, reject) {
		var form = { inputEmailHandle, inputPassword };
		var options = { url, headers: { Referer }, form };
		request.post(options, function(err, response, body) {
			if(!err) {
				var cookies = response && response.headers && response.headers['set-cookie'];
				var session = cookies && cookies[0].split('=')[1];
				console.log(`heres your cookie: ${session}`);	
				// return resolve(response);
				return resolve(session);
			}
			return reject(err);
		})
	});
}

authenticate()
.then(session => publish(session));