import express from "express";
import { elasticSearch } from "../controller/elastic.controller.js";

const router = express.Router();

router.get("/", elasticSearch);

export default router;
