import { Client } from "@elastic/elasticsearch";
import config from "../config/config.js";

const { elastic_api_key, elastic_node } = config;

const client = new Client({
  node: elastic_node,
  auth: {
    apiKey: elastic_api_key,
  },
});

export default client;
