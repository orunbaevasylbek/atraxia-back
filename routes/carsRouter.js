const Router = require("express");
const router = new Router();
const carsController = require("../controllers/carsController.js");
const checkRole = require("../middleware/checkRoleMiddleware");

router.post("/", carsController.create);
router.get("/", carsController.getAll);
router.get("/:id", carsController.getOne);
router.delete("/:id", carsController.delete);
router.patch("/:id", carsController.update);

module.exports = router;
