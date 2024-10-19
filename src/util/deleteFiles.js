import fs from "fs";

function deleteFile(filePath) {
  try {
    fs.unlink(filePath, (err) => {
      if (err) {
        console.error("Error deleting the file:", err);
      } else {
        console.log("File deleted successfully!");
      }
    });
  } catch (error) {
    console.error("Error deleting the file:", error);
  }
}

export default deleteFile;
