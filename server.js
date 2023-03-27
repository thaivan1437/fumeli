const express = require("express");
const next = require("next");
const sassMiddleware = require("node-sass-middleware");
const path = require("path");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

const router = express.Router();

// Định nghĩa các route tương ứng với các trang của bạn tại đây
router.get('/nhiem-vu/:pid', (req, res) => {
  return app.render(req, res, '/nhiem-vu/[pid]', { pid: req.params.pid });
});

router.get('/nhiem-vu', (req, res) => {
  return app.render(req, res, '/nhiem-vu/index', {});
});

router.get('/nhiem-vu/invite', (req, res) => {
  return app.render(req, res, '/nhiem-vu/invite', {});
});

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

  server.get("*", (req, res) => {
    return handle(req, res);
  });

  server.listen(3000, (err) => {
    if (err) throw err;
    console.log("> Ready on http://localhost:3000");
  });
});
