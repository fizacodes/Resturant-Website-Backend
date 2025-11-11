import express from "express";
import { createOrder,getAllOrders,updateOrderStatus,deleteOrder } from "../controllers/OrderController.js";
import { verifyToken } from "../middlewares/verifyToken.js";
import { adminOnly } from "../middlewares/adminOnly.js";

const router =express.Router();

router.post("/create-order",verifyToken,adminOnly,createOrder);
router.get("/all-orders",verifyToken,adminOnly,getAllOrders);
router.put("/update-order/:id",verifyToken,adminOnly,updateOrderStatus)
router.delete("/delete-order/:id",verifyToken,adminOnly,deleteOrder)

export default router;  