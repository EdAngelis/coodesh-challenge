import cronUpdateProducts from "./cron.js";
import getMemoryUsage from "./util/getMemory_usage.js";
import app from "./app.js";

cronUpdateProducts();

const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  const memory = getMemoryUsage();
  res.send(memory);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
