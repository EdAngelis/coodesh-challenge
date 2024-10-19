import db from "../db/db.js";

const collection = db.collection("products");

export const fetchAll = async (page, pageSize) => {
  return await collection
    .find()
    .skip((page - 1) * pageSize)
    .limit(pageSize)
    .toArray();
};

export const fetch = async (code) => {
  return await collection.findOne({ code: parseInt(code) });
};

export const update = async (code, product) => {
  return await collection.updateOne(
    { code: parseInt(code) },
    { $set: product }
  );
};

export const softDelete = async (code) => {
  return await collection.updateOne(
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
