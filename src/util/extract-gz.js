import fs from "fs";
import zlib from "zlib";

// Function to extract .gz file
function extractGzFile(source, destination) {
  const unzip = zlib.createGunzip();
  const readStream = fs.createReadStream(source);
  const writeStream = fs.createWriteStream(destination);

  readStream
    .pipe(unzip)
    .pipe(writeStream)
    .on("finish", () => console.log("File extracted successfully."));
}

export default extractGzFile;
