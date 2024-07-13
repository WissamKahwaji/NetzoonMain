import express from "express";
import { addAdmin, adminSignIn } from "../controllers/adminctrl.js";

const router = express.Router();

router.post("/signin", adminSignIn);
router.post("/add", addAdmin);

export default router;
