const express = require("express");
const next = require("next");
const sassMiddleware = require("node-sass-middleware");
const path = require("path");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  server.use(
    sassMiddleware({
      src: path.join(__dirname, "src", "styles"),
      dest: path.join(__dirname, "src", "styles"),
      debug: true,
      outputStyle: "compressed",
    })
  );

  server.get('/nhiem-vu/:pid', (req, res) => {
    return app.render(req, res, '/nhiem-vu/[pid]', { pid: req.params.pid });
  });

  server.get('/nhiem-vu/invite', (req, res) => {
    return app.render(req, res, '/nhiem-vu/invite');
  });

  server.get("*", (req, res) => {
    return handle(req, res);
  });

  server.listen(3000, (err) => {
    if (err) throw err;
    console.log("> Ready on http://localhost:3000");
  });
});
