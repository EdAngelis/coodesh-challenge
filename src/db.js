import { MongoClient } from "mongodb";

const connectionString =
  process.env.DB_URI ||
  "mongodb+srv://ed4ngelis:SZpg5yyAWAaaVPx0@cluster0.ku49w.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

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
