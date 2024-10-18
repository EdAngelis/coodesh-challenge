import express from "express";
import productsRoutes from "./route/products.routes.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/products", productsRoutes);

export default app;
