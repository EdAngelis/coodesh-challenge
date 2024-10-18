import "dotenv/config";

const API_KEY = process.env.API_KEY || "my-api-key";

const checkApiKey = (req, res, next) => {
  const apiKey = req.headers["x-api-key"];

  if (apiKey && apiKey === API_KEY) {
    next();
  } else {
    res.status(403).json({ message: "Forbidden: Invalid API key" });
  }
};

export default checkApiKey;
