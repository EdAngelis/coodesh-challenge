import updateProducts from "./services/updateProducts.js";
import cron from "node-cron";
import config from "./config/config.js";

const runCron = async () => {
  const cronTime = config.cron_time;
  const cronFirstTime = config.cron_first_time;

  if (cronFirstTime) await updateProducts();

  console.log("Running cron job once a day at 5:00 AM");

  cron.schedule(cronTime, async () => {
    await updateProducts();
    console.log("Cron job finished, see you tomorrow!");
  });
};

export default runCron;
