function navigate(side_num, remote_url, local_url) {
	if (side_num == 1) {
		side_ip = side_ip1;
	} else if (side_num == 2) {
		side_ip = side_ip2;
	} else if (side_num == 3) {
		side_ip = side_ip3;
	} else {
		alert("Can't navigate to side_ip #" + side_num);
	}
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