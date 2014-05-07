var utils = require("./utils");

var getMessages = function(request, response) {
  utils.sendResponse(response, storage, 200);
};

var idCounter = 0;
var postMessage = function(request, response) {
  utils.collectData(request, function(data){
    var results = storage.results;
    var message = JSON.parse(data);
    message.objectId = ++idCounter;
    results.push(message);
    utils.sendResponse(response, results[results.length], 201);
  });
};

var options = function(request, response) {
  utils.sendResponse(response, "Hello?", 200);
};


exports.handler = function(request, response) {

  console.log("Serving request type " + request.method + " for url " + request.url);

  var actions = {
    "GET": getMessages,
    "POST": postMessage,
    "OPTIONS": options
  };

  var action = actions[request.method];
  if (action) {
    action(request, response);
  } else {
    utils.sendResponse(response, "Not Found", 404);
  }

};


var storage = {results: []};
