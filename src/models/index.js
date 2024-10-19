import productsModel from "./products.model.js";
import logsModel from "./logs.model.js";
import db from "../db/db.js";

export const collectionsNames = {
  PRODUCTS: "products",
  LOGS: "logs",
};

const startModels = () => {
  productsModel(db, collectionsNames.PRODUCTS);
  logsModel(db, collectionsNames.LOGS);

  return db;
};

export const Products = db.collection(collectionsNames.PRODUCTS);
export const Logs = db.collection(collectionsNames.LOGS);

export default startModels;
