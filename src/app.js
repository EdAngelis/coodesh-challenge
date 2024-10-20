import express from "express";
import productsRoutes from "./route/products.routes.js";
import elasticRoutes from "./route/elastic.routes.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/products", productsRoutes);
app.use("/elastic", elasticRoutes);

export default app;
