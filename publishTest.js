var request = require('request');
var fs = require('fs');


function publishToCity(cookie) {
	var url = fs.readFileSync('request_config.txt').toString().split('\n').map(c => c.trim()).pop();
	if(!url)
		throw new Error('There was no home page url to request');

	var jar = request.jar();
	var _cookie = request.cookie(`cl_session=${cookie}`);
	jar.setCookie(_cookie, url);
	console.log('cookies before request: ', jar.getCookies(url));
	request({ url, jar }, function(err, response, body) {
		debugger;
		console.log('cookies after request: ', jar.getCookies(url));
		fs.writeFileSync('body.html', body);
	});
}

module.exports = publishToCity;