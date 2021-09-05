/* eslint-disable no-console */
const jsonServer = require("json-server");
const server = jsonServer.create();
const path = require("path");
const router = jsonServer.router(path.join(__dirname, "db.json"));

const middlewares = jsonServer.defaults();
server.use(middlewares);
server.use(jsonServer.bodyParser);
server.use(router);

const port = process.env.API_PORT || 3011;
server.listen(port, () => {
  console.log(`JSON Server is running on port ${port}`);
});
