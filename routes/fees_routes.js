import express from "express";
import auth from "../middlewares/auth.js";
import adminAuth from "../middlewares/admin-check.js";
import { EditFees, getFees } from "../controllers/fees_ctrl.js";

const router = express.Router();

router.get("/", getFees);
router.put("/", auth, adminAuth, EditFees);

export default router;
