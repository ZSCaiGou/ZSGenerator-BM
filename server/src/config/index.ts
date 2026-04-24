import "dotenv/config";

export const config = {
  port: Number(process.env.PORT) || 3000,
  nodeEnv: process.env.NODE_ENV || "development",
  cors: {
    origin: process.env.CORS_ORIGIN || "*",
  },
  database: {
    url: process.env.MONGO_URI || "mongodb://localhost:27017/zs_bm",
  },
};

export default config;
