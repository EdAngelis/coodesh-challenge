import cron from "node-cron";

const runCron = async () => {
  // cron once a day at 5:00 AM
  console.log("Running cron job once a day at 5:00 AM");

  cron.schedule("0 5 * * *", () => {
    console.log("Running cron job once a day at 5:00 AM");
  });
};

export default runCron;
