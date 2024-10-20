import fs from "fs";

function deleteFile(filePath) {
  try {
    fs.unlink(filePath, (err) => {
      if (err) {
        throw new Error("Error deleting Files", err.message);
      } else {
        console.log("File deleted successfully!");
      }
    });
  } catch (error) {
    throw new Error("Error deleting Files", error.message);
  }
}

export default deleteFile;
