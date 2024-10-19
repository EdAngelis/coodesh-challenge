import repository from "../repository/product.repository.js";

export const updateProduct = async (req, res) => {
  try {
    const { code } = req.params;
    const product = req.body;

    const response = await repository.update(code, product);

    if (response.matchedCount === 0) {
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
    const products = await repository.fetchAll(page, pageSize);

    if (products.length === 0)
      return res.status(404).json({ message: "Products not found" });

    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
};

export const getProduct = async (req, res) => {
  try {
    const { code } = req.params;
    const product = await repository.fetch(code);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(product);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
};

export const remove = async (req, res) => {
  try {
    const { code } = req.params;

    const response = await repository.softDelete(code);

    if (response.matchedCount === 0) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product deleted" });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
};
