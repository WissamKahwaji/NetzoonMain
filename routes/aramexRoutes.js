import express from "express";
import {
  calculateRateController,
  createPickUpController,
  createPickupWithShipmentController,
  createShipmentController,
  fetchCities,
  trackPickUp,
} from "../controllers/aramex.js";
import auth from "../middlewares/auth.js";

const router = express.Router();

router.post("/calculateRate", calculateRateController);
router.post("/createPickUp", auth, createPickUpController);
router.post(
  "/createPickUpWithShipment",
  auth,
  createPickupWithShipmentController
);
router.post("/createShipment", auth, createShipmentController);
router.post("/fetchCities", fetchCities);
router.post("/trackPickup", trackPickUp);
export default router;
