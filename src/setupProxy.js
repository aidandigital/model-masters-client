const createProxyMiddleware = require("http-proxy-middleware");
module.exports = function (app) {
  app.use(
    ["/api/*", "/html/*", "/api/register"], //routes the proxy is looking for
    createProxyMiddleware({
      target: "https://localhost:3001", // proxy will serve data to target
    })
  );
};
