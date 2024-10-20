const model = async (db, collectionName) => {
  const collections = await db
    .listCollections({ name: collectionName })
    .toArray();

  if (collections.length === 0) {
    await db.createCollection(collectionName, {
      validator: {
        $jsonSchema: {
          bsonType: "object",
          properties: {
            code: {
              bsonType: ["int", "double"],
            },
            status: {
              bsonType: "string",
            },
            imported_t: {
              bsonType: "date",
            },
            url: {
              bsonType: "string",
            },
            creator: {
              bsonType: "string",
            },
            created_t: {
              bsonType: ["int", "double"],
            },
            last_modified_t: {
              bsonType: ["int", "double"],
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
              bsonType: ["int", "double"],
            },
            nutriscore_score: {
              bsonType: ["int", "double"],
            },
            nutriscore_grade: {
              bsonType: "string",
            },
            main_category: {
              bsonType: "string",
            },
            image_url: {
              bsonType: "string",
            },
          },
        },
      },
    });
  }

  await db.collection(collectionName).createIndex({ code: 1 });
};

export default model;
