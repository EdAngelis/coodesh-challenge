import productsModel from "./products.model.js";

export const collectionsNames = {
  PRODUCTS: "products",
};

const models = (db) => {
  productsModel(db, collectionsNames.PRODUCTS);
};

export default models;
