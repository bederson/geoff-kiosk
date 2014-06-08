// host_url = "ws://localhost:9222/devtools/page/33A01BA9-C7E0-A9CB-BECA-34F2252D21E2"
// var socket = new WebSocket(host_url);

// setTimeout(function(){navigate('http:www.yahoo.com')}, 1000);

function getSocket(port, title) {
	url = "http://localhost:" + port + "/" + title;
	console.log("getSocket: " + url);
	socket_callback = function(data) {
		console.log("callback = " + data);
	};
	$.ajax({
		url: url,
		dataType: "jsonp",
		callback: "socket_callback",
		success: function (data, status) {
			console.log("success: " + status);
			for (i in data) {
				tab = data[i];
				tabTitle = tab["title"];
				if (tabTitle == title) {
					socket = tab["webSocketDebuggerUrl"]
					alert("socket url = " + socket);
				}
			}			
		},
		error: function (data, status) {
			console.log("error:");
			console.log("str = " + status);
		}
	});
	$.getJSON(url+"?callback=socket_callback", function(data) {
		console.log(data)
	});
}

function navigate(url) {
    msg = {'id':1001, 'method':'Page.navigate', 'params':{'url':url}};
    socket.send(JSON.stringify(msg));
}

$(document).ready(function() {
	getSocket("9223", "json");
});