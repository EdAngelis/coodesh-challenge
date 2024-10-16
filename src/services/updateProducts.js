import extractGzFile from "../util/extract-gz.js";
import axios from "axios";
import downloadFile from "../util/download_file.js";

const updateProducts = async () => {
  try {
    const files = await axios.get(
      "https://challenges.coode.sh/food/data/json/index.txt"
    );

    const filesToArray = files.data.split("\n");

    downloadFile(
      `https://challenges.coode.sh/food/data/json/${filesToArray[0]}`,
      `./${filesToArray[0]}`
    ).then(() => {
      console.log("File downloaded");

      extractGzFile(`./${filesToArray[0]}`, "products_temp.json");
    });
  } catch (error) {
    console.error(error);
  }
};

export default updateProducts;
