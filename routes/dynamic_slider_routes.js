import express from "express";
import {
  addSliders,
  editSlider,
  getAllSlidersImages,
} from "../controllers/dynamic_slider_ctrl.js";
import auth from "../middlewares/auth.js";

const router = express.Router();

router.get("/", getAllSlidersImages);
router.post("/add-sliders", auth, addSliders);
router.put("/edit/:sliderId", auth, editSlider);

export default router;
