import fs from "fs";
import readline from "readline";
import formatProductObjectFromJson from "./jsonToProductObject.js";

async function selectObjectsFromJson(filePath, limit) {
  const objects = [];

  const fileStream = fs.createReadStream(filePath);
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  let count = 0;

  for await (const line of rl) {
    if (count >= limit) break;

    try {
      const data = JSON.parse(line);

      const product = formatProductObjectFromJson(data);

      objects.push(product);
      count++;
    } catch (err) {
      console.error(`Error parsing line: ${err}`);
    }
  }
  return objects;
}

export default selectObjectsFromJson;
