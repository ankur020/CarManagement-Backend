import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
import {
  createCar,
  getUserCars,
  getCar,
  updateCar,
  deleteCar,
  searchCars,
  deleteCarImage,
} from "../controllers/car.controller.js";

const router = Router();

router.route("/addcar").post(verifyJWT, upload.array("images", 10), createCar);
router.route("/getAllCars").get(verifyJWT, getUserCars);
router.route("/search").get(verifyJWT, searchCars);
router.route("/getSingleCar/:id").get(verifyJWT, getCar);
router.route("/updateCar/:id").patch(verifyJWT, updateCar);
router.route("/deleteCar/:id").delete(verifyJWT, deleteCar);
router.route("/:id/delete-image").delete(verifyJWT, deleteCarImage);

export default router;
