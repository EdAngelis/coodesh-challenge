import app from "./app.js";
import config from "./config/config.js";
import cronUpdateProducts from "./cron.js";
import getMemoryUsage from "./util/getMemory_usage.js";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import path from "path";
import startModels, { Logs } from "./models/index.js";
import serverOnlineTime from "./util/serverOnlineTime.js";
import { sqlite, selectCronLog } from "./db/SQLite.js";

sqlite();
const db = startModels();

const absolutePath = path.resolve();

const swaggerDocument = YAML.load(path.join(absolutePath, "docs/api.yml"));

cronUpdateProducts();

const port = config.port;

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get("/", async (req, res) => {
  const lastCronExecution =
    selectCronLog() ||
    (await Logs.find({ type: "products_updated" })
      .sort({ date: -1 })
      .limit(1)
      .toArray());
  const dbDetails = await db.command({ dbStats: 1 });
  const memory = getMemoryUsage();

  res.status(200).json({
    uso_de_memoria: memory.rss,
    database_name: dbDetails.db,
    cron_ultima_execucao: lastCronExecution[0].date || "Ainda não executado",
    tempo_online_da_api: serverOnlineTime(),
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

process.on("unhandledRejection", (reason, promise) => {
  throw new Error("Unhandled Rejection at:", promise, "reason:", reason);
});

process.on("uncaughtException", (err) => {
  throw new Error("Uncaught Exception thrown", err);
});
