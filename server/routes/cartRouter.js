import express from "express";
import { addPetToCart, getCartByUserId } from "../controllers/cartController.js";
const router = express.Router();

router
  .route("/:userId")
  .all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "json/plain");
    next();
  })
  .get(getCartByUserId);

router
  .route("/:userId/:petId")
  .all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "json/plain");
    next();
  })
  .post(addPetToCart);


// router
//   .route("/species")
//   .all((req, res, next) => {
//     res.statusCode = 200;
//     res.setHeader("Content-Type", "json/plain");
//     next();
//   })
//   .post(addSpecies);

export default router;
