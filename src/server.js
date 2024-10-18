import app from "./app.js";
import config from "./config/config.js";
import cronUpdateProducts from "./cron.js";
import getMemoryUsage from "./util/getMemory_usage.js";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import path from "path";

const absolutePath = path.resolve();

const swaggerDocument = YAML.load(path.join(absolutePath, "docs/api.yml"));
cronUpdateProducts();

const port = config.port;

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get("/", (req, res) => {
  const memory = getMemoryUsage();
  res.send(memory);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
