import express from "express";
import { check } from "express-validator";
import {
  EditUser,
  addAccount,
  addNumberOfVisitors,
  addProductToFavorites,
  addProductsToSelectedProducts,
  changeAccount,
  changePassword,
  clearFav,
  deleteAccount,
  deleteProductFromSelectedProducts,
  deleteUser,
  forgetPassword,
  getAccountByEmail,
  getAllFavorites,
  getAllUsers,
  getSelectedProducts,
  getUserById,
  getUserByType,
  getUserFollowers,
  getUserFollowings,
  getUserTotalRating,
  getVisitors,
  oAuthSignIn,
  otpLogin,
  rateUser,
  refreshAccessToken,
  removeProductFromFavorites,
  resetPassword,
  search,
  // searchOnUser,
  signUp,
  signin,
  toggleFollow,
  verifyOTPLogin,
} from "../controllers/userCtrl.js";
import { stripeAccount } from "../services/stripe_service.js";
import auth from "../middlewares/auth.js";
import passport from "../services/passport.js";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";
import axios from "axios";

const router = express.Router();

const userType = [
  "local_company",
  "user",
  "freezone",
  "factory",
  "car",
  "planes",
  "sea_companies",
  "news_agency",
  "real_estate",
  "trader",
  "delivery_company",
];

router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/signin" }),
  async (req, res) => {
    try {
      // Generate a JWT token
      const token = jwt.sign(
        { email: req.user.email, id: req.user._id },
        process.env.JWT_SECRET_KEY,
        { expiresIn: "7d" }
      );

      // Find the user in the database to get userName
      const user = await userModel.findById(req.user._id);

      if (!user) {
        throw new Error("User not found");
      }

      const getUserResponse = await axios.get(
        `https://api-D27C6110-9DB9-4EBE-AA85-CF39E2AF562E.sendbird.com/v3/users`,
        {
          headers: {
            "Api-Token": "8431b9677570a63562158dc40c06675cdfc12c47",
          },
        }
      );

      if (getUserResponse.status === 200) {
        const users = getUserResponse.data.users;
        const userExists = users.some(
          existingUser => existingUser.user_id === req.user.username
        );
        if (userExists) {
          console.log("in");
        } else {
          const payload = {
            user_id: req.user.username,
            nickname: req.user.username,
            profile_url: req.user.profilePhoto ?? "",
            issue_access_token: true,
          };
          const response = await axios.post(
            `https://api-D27C6110-9DB9-4EBE-AA85-CF39E2AF562E.sendbird.com/v3/users`,
            payload,
            {
              headers: {
                "Api-Token": "8431b9677570a63562158dc40c06675cdfc12c47",
              },
            }
          );
        }
      }

      // Redirect to the frontend with the token, userName, and email
      res.redirect(
        `https://www.netzoonweb.siidevelopment.com/signin?token=${token}&username=${user.username}&userId=${user._id}`
      );
    } catch (err) {
      console.error("Error in Google callback:", err);
      res.redirect("https://www.netzoonweb.siidevelopment.com/signin");
    }
  }
);

router.get(
  "/auth/facebook",
  passport.authenticate("facebook", { scope: ["email"] })
);

router.get(
  "/auth/facebook/callback",
  passport.authenticate("facebook", { failureRedirect: "/signin" }),
  async (req, res) => {
    try {
      // Generate JWT
      const token = jwt.sign(
        { email: req.user.email, id: req.user._id },
        process.env.JWT_SECRET_KEY,
        { expiresIn: "7d" }
      );

      // Sendbird integration
      const user = await userModel.findById(req.user._id);

      if (!user) throw new Error("User not found");

      const getUserResponse = await axios.get(
        `https://api-D27C6110-9DB9-4EBE-AA85-CF39E2AF562E.sendbird.com/v3/users`,
        {
          headers: {
            "Api-Token": "8431b9677570a63562158dc40c06675cdfc12c47",
          },
        }
      );

      if (getUserResponse.status === 200) {
        const users = getUserResponse.data.users;
        const userExists = users.some(
          existingUser => existingUser.user_id === req.user.username
        );
        if (userExists) {
          console.log("in");
        } else {
          const payload = {
            user_id: req.user.username,
            nickname: req.user.username,
            profile_url: req.user.profilePhoto ?? "",
            issue_access_token: true,
          };
          const response = await axios.post(
            `https://api-D27C6110-9DB9-4EBE-AA85-CF39E2AF562E.sendbird.com/v3/users`,
            payload,
            {
              headers: {
                "Api-Token": "8431b9677570a63562158dc40c06675cdfc12c47",
              },
            }
          );
        }
      }

      // Redirect to frontend with token
      res.redirect(
        `https://www.netzoonweb.siidevelopment.com/signin?token=${token}&username=${user.username}&userId=${user._id}`
      );
    } catch (err) {
      console.error("Error in Facebook callback:", err);
      res.redirect("https://www.netzoonweb.siidevelopment.com/signin");
    }
  }
);

router.post(
  "/register",
  [
    check("email").isEmail().withMessage("Please enter a valid email address"),
    check("password")
      .trim()
      .isLength({ min: 8 })
      .not()
      .isEmpty()
      .withMessage("Please enter a valid email address"),
    check("username").trim().not().isEmpty(),
    check("userType")
      .isIn(userType)
      .withMessage("userType value must be one of: " + userType.join(", ")),
    check("isFreeZoon")
      .isBoolean()
      .withMessage("isFreeZoon must be a boolean value"),
  ],
  signUp
);
router.post(
  "/signin",
  [
    check("email").isEmail().withMessage("Please enter a valid email address"),
    check("password")
      .trim()
      .isLength({ min: 8 })
      .not()
      .isEmpty()
      .withMessage("Please enter a valid email address"),
  ],
  signin
);
router.post("/oauth", oAuthSignIn);
router.post("/changeAccount", changeAccount);

router.put("/password/:userId", auth, changePassword);
router.delete("/delete-user/:userId", auth, deleteAccount);
router.post("/otpLogin", otpLogin);
router.post("/verifyOtpLogin", verifyOTPLogin);

router.put("/net-editUser/:userId", auth, EditUser);
router.get("/getuseraccounts", getAccountByEmail);
router.post("/addaccount", auth, addAccount);

router.post("/favorites/add", auth, addProductToFavorites);
router.post("/favorites/remove", auth, removeProductFromFavorites);
router.post("/favorites/clear", auth, clearFav);
router.get("/favorites/:userId", getAllFavorites);
router.get("/getUser/:userId", getUserById);
router.get("/getUserByType", getUserByType);
router.get("/getSelectedProducts/:userId", getSelectedProducts);
router.post(
  "/addToSelectedProducts/:userId",
  auth,
  addProductsToSelectedProducts
);
router.delete(
  "/deleteFromSelectedProducts/:userId/:productId",
  auth,
  deleteProductFromSelectedProducts
);

router.put("/toggleFollow/:otherUserId", toggleFollow);
router.get("/getUserFollowings/:userId", getUserFollowings);
router.get("/getUserFollowers/:userId", getUserFollowers);

router.get("/search", search);

router.post("/:userId/addvisitor", addNumberOfVisitors);
router.get("/:id/visitors", getVisitors);
router.post("/:id/rate", rateUser);
router.get("/:id/rating", getUserTotalRating);
// router.delete("/net-remove/:id", deleteUser);
router.get("/get-all-users", getAllUsers);
// router.get("/search", searchOnUser);
router.get("/api/stripe/account", stripeAccount);

router.post("/forget-password", forgetPassword);
router.put("/reset-password/:token", resetPassword);
router.post("/refreshToken", refreshAccessToken);

export default router;
