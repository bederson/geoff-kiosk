var msgid = 1001;

function navigate(socket_url, url) {
	console.log("SOCKET URL = " + socket_url)
	console.log("URL = " + url)
	var side_socket = new WebSocket(socket_url);
	if (side_socket != "") {
		side_socket.onopen = function(e) {
			msg = {'id':msgid, 'method':'Page.navigate', 'params':{'url':url}};
			side_socket.send(JSON.stringify(msg));
			side_socket.close();
			msgid += 1;
		};
	}
}