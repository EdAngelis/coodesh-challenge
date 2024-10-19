import { Products } from "../models/index.js";

export const fetchAll = async (page, pageSize) => {
  return await Products.find()
    .skip((page - 1) * pageSize)
    .limit(pageSize)
    .toArray();
};

export const fetch = async (code) => {
  return await Products.findOne({ code: parseInt(code) });
};

export const update = async (code, product) => {
  return await Products.updateOne({ code: parseInt(code) }, { $set: product });
};

export const softDelete = async (code) => {
  return await Products.updateOne(
    { code: parseInt(code) },
    { $set: { status: "trash" } }
  );
};

export default {
  fetchAll,
  fetch,
  update,
  softDelete,
};
