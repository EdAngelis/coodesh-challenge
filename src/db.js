import { MongoClient } from "mongodb";
import config from "./config/config.js";

const connectionString = config.db_uri;

const client = new MongoClient(connectionString);

let conn;

try {
  conn = await client.connect();
  console.log("Connected to the database");
} catch (e) {
  console.error(e);
}
let db = conn.db("open-food-facts");

await db.collection("products").createIndex({ code: 1 });

export default db;
