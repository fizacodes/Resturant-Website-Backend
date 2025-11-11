import express from "express";
import { upload } from "../middlewares/upload.js";
import {
  createMenuItem,
  getMenuItems,
  updateMenuItem,
  deleteMenuItem,
} from "../controllers/menuController.js";
import { verifyToken } from "../middlewares/verifyToken.js";
import { adminOnly } from "../middlewares/adminOnly.js";

const router = express.Router();

// CREATE menu item (with image upload)
router.post("/create",verifyToken,adminOnly, upload.single("image"), createMenuItem);

// GET ALL
router.get("/all",verifyToken, getMenuItems);

// Update route
router.put("/:id", verifyToken, adminOnly, upload.single("image"), updateMenuItem);

// DELETE
router.delete("/:id",verifyToken,adminOnly, deleteMenuItem);

export default router;
