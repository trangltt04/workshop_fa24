import express from "express";
import {
  createCategory,
  deleteCategory,
  getCategories,
  getCategoryById,
  updateCategory,
} from "../controllers/category";

const router = express.Router();

// Middleware kết hợp

// Định nghĩa các route cho Category
router.post("/categories", createCategory);
router.get("/categories", getCategories);
router.get("/categories/:id", getCategoryById);
router.put("/categories/:id", updateCategory);
router.delete("/categories/:id", deleteCategory);

export default router;
