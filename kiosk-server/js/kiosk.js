// host_url = "ws://localhost:9222/devtools/page/33A01BA9-C7E0-A9CB-BECA-34F2252D21E2"
// var socket = new WebSocket(host_url);

// setTimeout(function(){navigate('http:www.yahoo.com')}, 1000);

var side1_socket = "";

function init_kiosk(side1_url) {
	if (side1_url != "") {
		side1_socket = new WebSocket(side1_url);
	}
}

function navigate(url) {
	if (side1_socket != "") {
		msg = {'id':1001, 'method':'Page.navigate', 'params':{'url':url}};
		side1_socket.send(JSON.stringify(msg));
	}
}

$(document).ready(function() {
	if (side1_socket == "") {
		$("#info").html("<h1>Unable to connect to side pages</h1>");
	} else {
		$("#info").html("Successfully connected to side pages");
	}
});