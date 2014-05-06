/* You should implement your request handler function in this file.
 * And hey! This is already getting passed to http.createServer()
 * in basic-server.js. But it won't work as is.
 * You'll have to figure out a way to export this function from
 * this file and include it in basic-server.js so that it actually works.
 * *Hint* Check out the node module documentation at http://nodejs.org/api/modules.html. */

exports.handler = function(request, response) {
  /* the 'request' argument comes from nodes http module. It includes info about the
  request - such as what URL the browser is requesting. */

  /* Documentation for both request and response can be found at
   * http://nodemanual.org/0.8.14/nodejs_ref_guide/http.html */

  console.log("Serving request type " + request.method + " for url " + request.url);

  /* Without this line, this server wouldn't work. See the note
   * below about CORS. */
  var statusCode = 200;
  var headers = defaultCorsHeaders;
  headers['Content-Type'] = "text/plain";

  var data = '';
  // request.setEncoding('utf8');
  request.on('data', function(bit){

      data += bit;
  });

  request.on('end', function() {
    var body = 'Hello, World';
    // if (request.url !== '/classes/messages') {
      // statusCode = 404;
    if (request.method === 'POST') {
      storage.results.push(JSON.parse(data));
      console.log(storage.results);
      body = JSON.stringify(storage);
      statusCode = 201;
    } else if (request.method === 'GET') {
      statusCode = 200;
      body = JSON.stringify(storage);
    }
    response.writeHead(statusCode, headers);
    response.end(body);
  });


  /* .writeHead() tells our server what HTTP status code to send back */
  // response.writeHead(statusCode, headers);

  /* Make sure to always call response.end() - Node will not send
   * anything back to the client until you do. The string you pass to
   * response.end() will be the body of the response - i.e. what shows
   * up in the browser.*/
  // response.end("Hello, World!");
};

/* These headers will allow Cross-Origin Resource Sharing (CORS).
 * This CRUCIAL code allows this server to talk to websites that
 * are on different domains. (Your chat client is running from a url
 * like file://your/chat/client/index.html, which is considered a
 * different domain.) */
var defaultCorsHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10 // Seconds.
};

var storage = {results: []};

var chatMaker = function(createdAt, username, text, roomname) {
  return { createdAt: createdAt,
    username: username,
    text: text,
    roomname: roomname
  };
};

// if (request.url === '/classes/messages') {
// createdAt: "2013-10-07T16:22:03.280Z"
// objectId: "teDOY3Rnpe"
// roomname: "lobby"
// text: "hello"
// updatedAt: "2013-10-07T16:22:03.280Z"
// username: "gary"
