var http = require("http");
var handleRequest = require("./request-handler.js");
var parseURL = require("url").parse;
var utils = require("./utils.js");

var port = 3000;

var ip = "127.0.0.1";

var routes = {
  "/classes/messages": handleRequest.handler
};

var server = http.createServer(function(request, response) {
  var url = parseURL(request.url, true);

  var route = routes[url.pathname];
  if (route) {
    route(request, response);
  } else {
    utils.sendResponse(response, "Not Found", 404);
  }
});

console.log("Listening on http://" + ip + ":" + port);
server.listen(port, ip);
