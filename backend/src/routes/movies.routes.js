const { Router } = require("express");

const MoviesController = require("../controllers/MoviesController");
const ensureAuthenticated = require("../middleware/ensureAuthenticated");

const moviesController = new MoviesController();

const moviesRoutes = Router();

moviesRoutes.use(ensureAuthenticated);

moviesRoutes.get("/", moviesController.index);
moviesRoutes.get("/:id", moviesController.show);
moviesRoutes.delete("/:id", moviesController.delete);
moviesRoutes.post("/", moviesController.create);

module.exports = moviesRoutes;
