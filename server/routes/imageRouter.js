import express from "express"
import bodyParser from "body-parser"
import { getImageController } from "../controllers/imageController.js"
const  imageRouter = express.Router()

imageRouter.use(bodyParser.json());

// imageRouter
//     .route("/")
//     .all((req, res, next) => {
//         res.statusCode = 200;
//         res.setHeader("Content-Type", "json/plain");
//         next();
//     })
imageRouter.route("/:filename")
    .get(getImageController)


export default imageRouter;
