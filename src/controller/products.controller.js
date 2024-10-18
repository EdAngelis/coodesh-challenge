import db from "../db/db.js";

const collection = db.collection("products");

export const updateProduct = async (req, res) => {
  try {
    const { code } = req.params;
    const product = req.body;

    const updatedProduct = await collection.updateOne(
      { code: parseInt(code) },
      { $set: product },
      { new: true }
    );
    if (updatedProduct.matchedCount === 0) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product updated" });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
};

export const getProducts = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const pageSize = parseInt(req.query.pageSize) || 10;

  try {
    const products = await collection
      .find()
      .skip((page - 1) * pageSize)
      .limit(pageSize)
      .toArray();
    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
};

export const getProduct = async (req, res) => {
  try {
    const { code } = req.params;
    const product = await collection.findOne({ code: parseInt(code) });
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(product);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
};

export const softDelete = async (req, res) => {
  try {
    const { code } = req.params;

    const deletedProduct = await collection.updateOne(
      { code: parseInt(code) },
      { $set: { status: "trash" } }
    );

    if (updatedProduct.matchedCount === 0) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product deleted" });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
};
