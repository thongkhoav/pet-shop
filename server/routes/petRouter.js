import express from "express";
import { addPet, addSpecies, getPetById, getPets, getPetsBySpecies, updatePet } from "../controllers/petController.js";
import updateImage from '../config/multerConfig.js'
const petRouter = express.Router();

petRouter
  .route("/")
  .all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "json/plain");
    next();
  })
  .get(getPets)
  .post(updateImage.array("images",4), addPet);

petRouter
  .route("/species/:spe_id")
  .all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "json/plain");
    next();
  })
  .get(getPetsBySpecies)

petRouter
  .route("/:id")
  .all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "json/plain");
    next();
  })
  .get(getPetById)
  .post(updatePet)
//   .put(updateBlog)
//   .delete(deleteBlog);

export default petRouter;
