import updateProductsFromGzFile from "../util/updateProductsFromGzFile.js";
import axios from "axios";

import fs from "fs";

const updateProducts = async () => {
  try {
    const filesTitles = await axios.get(
      "https://challenges.coode.sh/food/data/json/index.txt"
    );

    const filesTitlesToArray = filesTitles.data
      .split("\n")
      .filter((file) => file !== "");

    const downloadPromises = filesTitlesToArray.map((file) => {
      const outputPath = `./${file}`;
      const url = `https://challenges.coode.sh/food/data/json/${file}`;
      return downloadFile(url, outputPath);
    });

    await Promise.all(downloadPromises);

    console.log("Files Downloaded");

    for await (const file of filesTitlesToArray) {
      const fileName = file.split(".")[0];

      const source = `./${file}`;
      const destination = `./${fileName}.json`;

      await updateProductsFromGzFile(source, destination);
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

async function downloadFile(url, outputPath) {
  const writer = fs.createWriteStream(outputPath);

  const response = await axios({
    method: "get",
    url: url,
    responseType: "stream",
  });

  response.data.pipe(writer);

  return new Promise((resolve, reject) => {
    writer.on("finish", resolve);
    writer.on("error", reject);
  });
}

export default updateProducts;
