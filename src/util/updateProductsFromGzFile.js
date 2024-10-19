import getNObjectsFromJson from "./getNObjectsFromJson.js";
import deleteFiles from "./deleteFiles.js";
import { insertCronLog } from "../db/SQLite.js";
import { Logs, Products } from "../models/index.js";
import zlib from "zlib";
import fs from "fs";

function updateProductsFromGzFile(source, destination) {
  const unzip = zlib.createGunzip();
  const readStream = fs.createReadStream(source);
  const writeStream = fs.createWriteStream(destination);

  readStream
    .pipe(unzip)
    .pipe(writeStream)
    .on("finish", async () => {
      console.log(`${destination.split(".")[0]} File extracted successfully`);
      const products = await getNObjectsFromJson(destination, 100);

      console.log("Products Updated");

      await Products.insertMany(products);

      await Logs.insertOne({
        date: new Date(),
        type: "products_updated",
        descritpion: `Last time products were updated`,
      });
      insertCronLog();

      await deleteFiles(source);
      await deleteFiles(destination);

      return;
    });
}

export default updateProductsFromGzFile;
