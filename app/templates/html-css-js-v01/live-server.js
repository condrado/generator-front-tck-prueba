var liveServer = require("live-server");

var params = {
  port: 8080,
  root: 'dist/',
  host: "0.0.0.0",
  open: true,
  file: "dist/index.html",
  logLevel: 2,
  middleware: [
    function(req, res, next) {
      next();
    }
  ]
};
liveServer.start(params);