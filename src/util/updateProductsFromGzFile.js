import getNObjectsFromJson from "./getNObjectsFromJson.js";
import deleteFiles from "./deleteFiles.js";
import zlib from "zlib";
import fs from "fs";

function updateProductsFromGzFile(source, destination, db) {
  const collection = db.collection("products");
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

      await collection.insertMany(products);

      const salveLog = await db.collection("logs").insertOne({
        date: new Date(),
        type: "products_updated",
        descritpion: `Last time products were updated`,
      });

      await deleteFiles(source);
      await deleteFiles(destination);

      return;
    });
}

export default updateProductsFromGzFile;
