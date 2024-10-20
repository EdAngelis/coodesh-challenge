import { MongoClient } from "mongodb";
import config from "../config/config.js";

const connectionString = config.db_uri;

const client = new MongoClient(connectionString);

let conn;

try {
  conn = await client.connect();
  console.log("Connected to the database");
} catch (e) {
  throw new Error("Error connecting to the database");
}
let db = conn.db("open-food-facts");

export default db;
