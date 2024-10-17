import express from "express";
import { updateProduct } from "../controller/products.controller.js";

const router = express.Router();

router.put("/:code", updateProduct);

export default router;
