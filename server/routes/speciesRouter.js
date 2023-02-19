import express from "express";
import { addPet, addSpecies, getPetById, getPets } from "../controllers/petController.js";
import updateImage from '../config/multerConfig.js'
import { getAllSpecies } from "../controllers/speciesController.js";
const petRouter = express.Router();

petRouter
  .route("/")
  .all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "json/plain");
    next();
  })
  .get(getAllSpecies)

// petRouter
//   .route("/:id")
//   .all((req, res, next) => {
//     res.statusCode = 200;
//     res.setHeader("Content-Type", "json/plain");
//     next();
//   })
//   .get(getPetById)
//   .put(updateBlog)
//   .delete(deleteBlog);

export default petRouter;
