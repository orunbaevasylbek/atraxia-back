const Router = require("express");
const router = new Router();
const carsRouter = require("./carsRouter.js");
const typeRouter = require("./typeRouter.js");
const userRouter = require("./userRouter.js");
const commentsRouter = require("./commentsRouter");
const favoritesRouter = require("./favoritesRouter");

router.use("/user", userRouter);
router.use("/type", typeRouter);
router.use("/cars", carsRouter);
router.use("/comments", commentsRouter);
router.use("/favorites", favoritesRouter);

module.exports = router;
