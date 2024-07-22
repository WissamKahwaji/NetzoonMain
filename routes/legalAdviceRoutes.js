import express from "express";
import { editInfo, getLegalAdvices } from "../controllers/legalAdviceCtrl.js";
import auth from "../middlewares/auth.js";

const router = express.Router();

router.get("/", getLegalAdvices);
router.put("/", editInfo);

export default router;
