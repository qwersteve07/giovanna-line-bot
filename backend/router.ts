import query from "./controllers/query";
import upsert from "./controllers/upsert";
const Router = require("@koa/router");
const router = new Router();

router.get("/", (ctx: any) => {
  ctx.body = "index";
  ctx.status = 200;
});

router.post("/query", query);
router.post("/upsert", upsert);

module.exports = router;
