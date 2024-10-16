import express from "express";
import cronUpdateProducts from "./cron.js";
import getMemoryUsage from "./util/getMemory_usage.js";

cronUpdateProducts();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  const memory = getMemoryUsage();
  res.send(memory);
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
