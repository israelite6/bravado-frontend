var http = require("http"),
  fs = require("fs"),
  util = require("util"),
  url = require("url");

var server = http.createServer(function (req, res) {
  const { search } = url.parse(req.url, true).query || {};
  console.log(search);

  res.writeHead(302, { Location: `bravado://search/${search}` });
  res.end();
});

server.listen(8080);
