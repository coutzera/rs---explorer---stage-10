const multer = require("multer");
const { Router } = require("express");

const uploadConfig = require("../configs/upload");
const UsersController = require("../controllers/UsersController");
const ensureAuthenticated = require("../middleware/ensureAuthenticated");
const UserAvatarController = require("../controllers/UserAvatarController");

const upload = multer(uploadConfig.MULTER);
const usersController = new UsersController();
const userAvatarController = new UserAvatarController();

const usersRoutes = Router();

usersRoutes.post("/", usersController.create);
usersRoutes.put("/", ensureAuthenticated, usersController.update);
usersRoutes.patch(
  "/avatar",
  ensureAuthenticated,
  upload.single("avatar"),
  userAvatarController.update
);

module.exports = usersRoutes;
