import express from "express";
import {
  updateProduct,
  getProducts,
  getProduct,
  remove,
} from "../controller/products.controller.js";
import apiKeyCheck from "../middlewares/api-key.js";

const router = express.Router();

router.put("/:code", apiKeyCheck, updateProduct);
router.get("/", apiKeyCheck, getProducts);
router.get("/:code", apiKeyCheck, getProduct);
router.put("/delete/:code", apiKeyCheck, remove);

export default router;
