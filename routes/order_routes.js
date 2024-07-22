import express from "express";
import {
  createTheOrder,
  deleteOrder,
  editOrderStatus,
  findAll,
  getAllOrders,
  getClientOrders,
  getOrderById,
  getUserOrders,
  saveOrder,
  updatePickupId,
  updateTheOrder,
} from "../controllers/orderCtrl.js";
import auth from "../middlewares/auth.js";
import adminAuth from "../middlewares/admin-check.js";

const router = express.Router();

router.get("/order/:userId", findAll);
router.get("/get/:userId", getUserOrders);
router.get("/client-orders/:clientId", getClientOrders);
router.post("/order/:userId", auth, createTheOrder);
router.put("/order/:userId", auth, updateTheOrder);
router.post("/save/:userId", saveOrder);
router.delete("/delete/:id", auth, adminAuth, deleteOrder);
router.put("/edit-status/:id", auth, adminAuth, editOrderStatus);
router.put("/edit-pickup/:id", auth, adminAuth, updatePickupId);
router.get("/get-all", getAllOrders);
router.get("/:id", getOrderById);

export default router;
