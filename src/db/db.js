import { MongoClient } from "mongodb";
import config from "../config/config.js";
import models from "../models/index.js";

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

models(db);

await db.collection("logs").createIndex({ date: -1 });
export default db;
