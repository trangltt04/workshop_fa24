import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getProductById,
  getProducts,
  updateProduct,
} from "../controllers/product.js";

const router = Router();

router.get("/products", getProducts);
router.post("/products", createProduct);
router.get("/products/:id", getProductById);
router.put("/products/:id", updateProduct);
router.delete("/products/:id", deleteProduct);

export default router;
