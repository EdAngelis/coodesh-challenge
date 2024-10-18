import config from "../config/config.js";

const API_KEY = config.api_key;

const checkApiKey = (req, res, next) => {
  const apiKey = req.headers["x-api-key"];

  if (apiKey && apiKey === API_KEY) {
    next();
  } else {
    res.status(403).json({ message: "Forbidden: Invalid API key" });
  }
};

export default checkApiKey;
