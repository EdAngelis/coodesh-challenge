const model = async (db, collectionName) => {
  const collections = await db
    .listCollections({ name: collectionName })
    .toArray();

  if (collections.length === 0) {
    await db.createCollection(collectionName, {
      validator: {
        $jsonSchema: {
          bsonType: "object",
          required: ["date", "type", "description"],
          properties: {
            date: {
              bsonType: "date",
            },
            type: {
              bsonType: "string",
            },
            description: {
              bsonType: "string",
            },
          },
        },
      },
    });
  }

  await db.collection("logs").createIndex({ date: -1 });
};

export default model;
