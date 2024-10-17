import cron from "node-cron";
import updateProducts from "./services/updateProducts.js";
import "dotenv/config";

const runCron = async () => {
  const cronTime = process.env.CRON_TIME || "0 5 * * *";
  await updateProducts();
  cron.schedule(cronTime, async () => {
    await updateProducts();
    console.log("Running cron job once a day at 5:00 AM");
  });
  console.log("Cron job finished, see you tomorrow!");
};

export default runCron;
