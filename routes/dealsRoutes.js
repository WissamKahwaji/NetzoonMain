import express from "express";
import {
  AddDeal,
  addDealsCategory,
  deleteDeal,
  deleteDealsCategory,
  editDeal,
  editDealsCategory,
  getAllDeals,
  getAllDealsByCat,
  getAllDealsCategories,
  getDealById,
  getDealCategoryById,
  getDealsItemsByCategory,
  getUserDeals,
  getUserPurchDeal,
  savePurchDeal,
} from "../controllers/dealsCtrl.js";
import auth from "../middlewares/auth.js";

const router = express.Router();

router.get("/", getAllDealsCategories);
router.get("/get-category/:id", getDealCategoryById);
router.post("/add-category", auth, addDealsCategory);
router.put("/edit-category/:id", auth, editDealsCategory);
router.delete("/delete-category/:id", auth, deleteDealsCategory);

router.get("/alldealsItems", getAllDeals);
router.get("/dealsByCat", getAllDealsByCat);
router.get("/get-deals-ByCat", getDealsItemsByCategory);
router.get("/:id", getDealById);
router.get("/userDeals/:userId", getUserDeals);
router.post("/addDeal", auth, AddDeal);
router.put("/:id", auth, editDeal);
router.delete("/:id", auth, deleteDeal);
router.post("/purch/save/:userId", savePurchDeal);
router.get("/purch/:userId", getUserPurchDeal);

export default router;
