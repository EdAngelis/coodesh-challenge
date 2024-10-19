const model = async (db, collectionName) => {
  const collections = await db
    .listCollections({ name: collectionName })
    .toArray();

  if (collections.length === 0) {
    await db.createCollection(collectionName, {
      validator: {
        $jsonSchema: {
          bsonType: "object",
          required: ["code", "status", "imported_t"],
          properties: {
            code: {
              bsonType: "int",
            },
            status: {
              bsonType: "string",
              enum: ["published", "draft", "trash"],
            },
            imported_t: {
              bsonType: "date",
            },
            url: {
              bsonType: "string",
              pattern: "^https?://",
            },
            creator: {
              bsonType: "string",
            },
            created_t: {
              bsonType: "int",
            },
            last_modified_t: {
              bsonType: "int",
            },
            product_name: {
              bsonType: "string",
            },
            quantity: {
              bsonType: "string",
            },
            brands: {
              bsonType: "string",
            },
            categories: {
              bsonType: "string",
            },
            labels: {
              bsonType: "string",
            },
            cities: {
              bsonType: "string",
            },
            purchase_places: {
              bsonType: "string",
            },
            stores: {
              bsonType: "string",
            },
            ingredients_text: {
              bsonType: "string",
            },
            traces: {
              bsonType: "string",
            },
            serving_size: {
              bsonType: "string",
            },
            serving_quantity: {
              bsonType: "double",
            },
            nutriscore_score: {
              bsonType: "int",
            },
            nutriscore_grade: {
              bsonType: "string",
              enum: ["a", "b", "c", "d", "e"],
            },
            main_category: {
              bsonType: "string",
            },
            image_url: {
              bsonType: "string",
              pattern: "^https?://",
            },
          },
        },
      },
    });
  }

  await db.collection(collectionName).createIndex({ code: 1 });
};

export default model;
