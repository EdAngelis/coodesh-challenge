import cron from "node-cron";
import updateProducts from "./services/updateProducts.js";

const runCron = async () => {
  cron.schedule("0 5 * * *", async () => {
    await updateProducts();

    console.log("Running cron job once a day at 5:00 AM");
  });
};

export default runCron;
