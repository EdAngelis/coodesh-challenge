import elastic from "./elastic.js";
import config from "../config/config.js";

const syncMongoToElastic = async (collection, index) => {
  if (config.sync_elastic) await initialSync(collection, index);

  const changeStream = collection.watch();

  try {
    changeStream.on("change", async (change) => {
      console.log("Change detected:");

      if (change.operationType === "insert") {
        const newDocument = change.fullDocument;
        await indexDocument(newDocument, index);
      } else if (change.operationType === "update") {
        const documentId = change.documentKey._id;
        await updateDocument(
          documentId,
          change.updateDescription.updatedFields,
          index
        );
      } else if (change.operationType === "delete") {
        const documentId = change.documentKey._id;
        await deleteDocument(documentId, index);
      }
    });
  } catch (error) {
    console.error("Change stream error:", error);
  }
};

async function indexDocument(document, index) {
  try {
    const { _id, ...body } = document;

    const result = await elastic.index({
      index,
      id: _id.toString(),
      body,
    });
  } catch (error) {
    console.error("Elasticsearch indexing error:", error);
  }
}

async function updateDocument(documentId, updatedFields, index) {
  try {
    const result = await elastic.update({
      index,
      id: documentId.toString(),
      body: {
        doc: updatedFields,
      },
    });
    console.log("Document updated:");
  } catch (error) {
    console.error("Elasticsearch update error:", error);
  }
}

async function deleteDocument(documentId, index) {
  try {
    const result = await elastic.delete({
      index,
      id: documentId.toString(),
    });
    console.log("Document deleted:");
  } catch (error) {
    console.error("Elasticsearch deletion error:", error);
  }
}

async function initialSync(collection, index) {
  const cursor = collection.find({});
  while (await cursor.hasNext()) {
    const doc = await cursor.next();
    await indexDocument(doc, index);
  }

  console.log("Initial sync completed");
}

export default syncMongoToElastic;
