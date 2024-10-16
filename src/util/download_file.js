import axios from "axios";
import fs from "fs";

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

export default downloadFile;
