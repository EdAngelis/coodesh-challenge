import express from "express";
import {
  updateProduct,
  getProducts,
  getProduct,
  softDelete,
} from "../controller/products.controller.js";

const router = express.Router();

router.put("/:code", updateProduct);
router.get("/", getProducts);
router.get("/:code", getProduct);
router.put("/delete/:code", softDelete);

export default router;
