var side1_socket = "";

function init_kiosk(side1_ip) {
	side1_url = "http://" + main_ip + ":" + main_port + "/get_socket?ip=" + side1_ip + ":" + side1_port + "&port=9222";
	$.get(side1_url, function(data) {
		console.log(data);
		side1_socket_url = data.replace("localhost:9222", side1_ip + ":" + side1_chrome_port);
		console.log(side1_socket_url);
		var side1_socket = new WebSocket(side1_socket_url);
	});
}

function navigate(url) {
	if (side1_socket != "") {
		msg = {'id':1001, 'method':'Page.navigate', 'params':{'url':url}};
		side1_socket.send(JSON.stringify(msg));
	}
}

$(document).ready(function() {
	init_kiosk(side1_ip)
	if (side1_socket == "") {
		$("#info").html("<h1>Unable to connect to side pages</h1>");
	} else {
		$("#info").html("Successfully connected to side pages");
	}
});