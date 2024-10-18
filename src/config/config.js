import "dotenv/config";

const config = {
  db_uri:
    process.env.DB_URI ||
    "mongodb+srv://ed4ngelis:SZpg5yyAWAaaVPx0@cluster0.ku49w.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
  cron_time: process.env.CRON_TIME || "0 5 * * *",
  port: process.env.PORT || 3000,
  api_key: process.env.API_KEY || "my-api-key",
};

export default config;
