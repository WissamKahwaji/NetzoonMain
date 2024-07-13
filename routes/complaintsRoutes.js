import express from "express";
import {
  addComplaints,
  deleteComplaint,
  editComplaint,
  getComplaints,
} from "../controllers/complaintsCtrl.js";
import auth from "../middlewares/auth.js";
import adminCheck from "../middlewares/admin-check.js";

const router = express.Router();

router.get("/", getComplaints);
router.post("/", auth, addComplaints);
router.put("/:id", auth, adminCheck, editComplaint);
router.delete("/:id", auth, adminCheck, deleteComplaint);

export default router;
