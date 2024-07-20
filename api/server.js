const jsonServer = require("json-server");
const path = require("path");
const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, "db.json"));
const middlewares = jsonServer.defaults();
const routes = require("./routes.json");

// Apply default middlewares (logger, static, cors, and no-cache)
server.use(middlewares);

// Middleware to block routes that don't start with /api/v1/
server.use((req, res, next) => {
  if (!req.url.startsWith("/api/v1/")) {
    res.sendStatus(404);
  } else {
    next();
  }
});

// Rewriter to map custom routes from routes.json
server.use(jsonServer.rewriter(routes));

// Use default router
server.use(router);

// Start the server
server.listen(3000, () => {
  console.log("JSON Server is running ~ 🚀");
});

// Export the Server API
module.exports = server;
