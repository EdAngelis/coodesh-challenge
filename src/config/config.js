import "dotenv/config";

const mode = process.env.NODE_ENV || "development";

const cronFirstTime = process.env.CRON_FIRST_TIME === "true";

const config = {
  development: {
    db_uri:
      process.env.DB_URI ||
      "mongodb+srv://ed4ngelis:SZpg5yyAWAaaVPx0@cluster0.ku49w.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
    cron_time: process.env.CRON_TIME || "0 5 * * *",
    port: process.env.PORT || 3000,
    api_key: process.env.API_KEY || "my-api-key",
    cron_first_time: cronFirstTime,
    notification_recipient_email:
      process.env.NOTIFICATION_RECIPIENT_EMAIL || "",

    elastic_index: process.env.ELASTIC_INDEX || "open_food_products",
    elastic_api_key:
      process.env.ELASTIC_API_KEY ||
      "RE9YRXFwSUJnQzJqUlh4UjRqRTk6WEpVeERQWjdRTUt6TFdZYjZ2Yjk4dw==",
    elastic_node:
      process.env.ELASTIC_NODE ||
      "https://84a7e3858a7643829e1d4c2ac4c128ca.us-central1.gcp.cloud.es.io:443",
  },
  production: {
    db_uri: process.env.DB_URI,
    cron_time: process.env.CRON_TIME,
    port: process.env.PORT,
    api_key: process.env.API_KEY,
    cron_first_time: cronFirstTime,
    notification_recipient_email: process.env.NOTIFICATION_RECIPIENT_EMAIL,
    elastic_index: process.env.ELASTIC_INDEX,
    elastic_api_key: process.env.ELASTIC_API_KEY,
    elastic_node: process.env.ELASTIC_NODE,
  },
};

export default config[mode];
