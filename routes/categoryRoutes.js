import express from "express";
import { createCategory, getCategories } from "../controllers/categoryController.js";
import { verifyToken } from "../middlewares/verifyToken.js";
import { adminOnly } from "../middlewares/adminOnly.js";

const router = express.Router();

router.post("/create-category",verifyToken,adminOnly, createCategory);
router.get("/show-category",verifyToken, getCategories);

export default router;
