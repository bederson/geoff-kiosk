host_url = "ws://localhost:9222/devtools/page/33A01BA9-C7E0-A9CB-BECA-34F2252D21E2"
var socket = new WebSocket(host_url);

function navigate(url) {
    msg = {'id':1001, 'method':'Page.navigate', 'params':{'url':url}};
    socket.send(JSON.stringify(msg));
}

setTimeout(function(){navigate('http:www.yahoo.com')}, 1000);