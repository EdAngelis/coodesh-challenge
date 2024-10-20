import client from "../db/elastic.js";
import config from "../config/config.js";

const { elastic_index } = config;

export const elasticSearch = async (req, res) => {
  const { query } = req.query;

  if (!query) {
    return res.status(400).json({ error: "Query parameter is required" });
  }

  try {
    const result = await client.search({
      index: elastic_index,
      body: {
        query: {
          match: {
            field_name: query,
          },
        },
      },
    });

    res.status(200).json(result.hits.hits);
  } catch (error) {
    console.error("Elasticsearch search error:", error);
    res.status(500).json({ error: "Elasticsearch search error" });
  }
};
