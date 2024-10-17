import db from "../db.js";

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

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
};
