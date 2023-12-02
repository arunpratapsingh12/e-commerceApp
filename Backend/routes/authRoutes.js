import express from "express";
import {
  registercontroller,
  logincontroller,
  testcontroller,
  forgotcontroller,
  updateProfileController,
  getOrdersController,
  getAllOrdersController,
  orderStatusController,
} from "../Controller/authcontroller.js";
import { isAdmin, requiresignIn } from "../middleware/authmiddleware.js";

//router

const router = express.Router();

//routing

//register || post
router.post('/register', registercontroller);

//register || post
router.post('/login', logincontroller);

//FORGOT passward || post
router.post('/forgot-passward', forgotcontroller);


//test routes for middleware
router.get("/test", requiresignIn, isAdmin, testcontroller);

//private routes for user

router.get('/user-auth', requiresignIn, (req, res) => {
  res.status(200).send({ ok: true });
})

//protected Admin route auth
router.get("/admin-auth", requiresignIn, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});

//update profile
router.put("/profile", requiresignIn, updateProfileController);


//orders
router.get("/orders", requiresignIn, getOrdersController);

//all orders
router.get("/all-orders", requiresignIn, isAdmin, getAllOrdersController);

// order status update
router.put(
  "/order-status/:orderId",
  requiresignIn,
  isAdmin,
  orderStatusController
);


export default router;