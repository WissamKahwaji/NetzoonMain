import express from "express";
import {
  addCategory,
  addProduct,
  createPaymentIntent,
  deleteCategory,
  deleteProduct,
  editCategory,
  editProduct,
  filterOnProducts,
  getAllCategoriesByDepartment,
  getAllDepartments,
  getAllProducts,
  getCategoriesByDepartment,
  getCategoryById,
  getConfig,
  getProductByCategory,
  getProductById,
  getProductTotalRating,
  getProductsByCategory,
  getSelectableProducts,
  getUserProducts,
  rateProduct,
} from "../controllers/departmenst/departmentsCtrl.js";
import auth from "../middlewares/auth.js";

const router = express.Router();

router.get("/categories", getCategoriesByDepartment);
router.get("/products", getProductsByCategory);
router.post("/addProduct", addProduct);
router.put("/editProduct/:productId", auth, editProduct);
router.delete("/delete-product/:productId", auth, deleteProduct);
router.get("/allProducts", getAllProducts);
router.get("/getSelectableProducts", getSelectableProducts);
router.get("/getUserProducts/:userId", getUserProducts);
router.get("/filters", filterOnProducts);
router.get("/getproduct/:productId", getProductById);
router.post("/products/:id/rate", rateProduct);
router.get("/products/:id/rating", getProductTotalRating);

router.get("/all-departments", getAllDepartments);
router.get("/:departmentId/all-categories", getAllCategoriesByDepartment);
router.get("/category/:categoryId", getCategoryById);
router.post("/:departmentId/add-category", auth, addCategory);
router.put("/edit-category/:categoryId", auth, editCategory);
router.delete("/delete-category/:categoryId", auth, deleteCategory);
router.get("/:categoryId/all-products", getProductByCategory);
router.get("/config", getConfig);
router.post("/create-payment", createPaymentIntent);

export default router;
