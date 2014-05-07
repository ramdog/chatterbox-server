var headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10,
  "Content-Type": "application/json"
};

exports.collectData = function(request, callback) {
  var data = "";
  request.on("data", function(partial){
    data += partial;
  });
  request.on("end", function(){
    callback(data);
    // callback(JSON.parse(data));
  });
};

exports.sendResponse = function(response, data, statusCode) {
  response.writeHead(statusCode, headers);
  response.end(JSON.stringify(data));
};
