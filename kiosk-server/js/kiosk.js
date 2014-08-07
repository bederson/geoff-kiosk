function navigate(remote_url, local_url) {
	full_url = "http://" + side_ip + ":" + side_port + "/navigate?port=" + side_chrome_port;
	full_url += "&url=" + remote_url;
	$.get(full_url, function(data) {
	})
	.always(function() {
		if (typeof local_url !== "undefined" && local_url !== null) {
			window.location.href=local_url;
		}
	});
}