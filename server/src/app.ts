import express from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import config from "./config/index.js";
import connectDB from "./config/database.js";
import { swaggerSpec } from "./config/swagger.js";
import routes from "./routes/index.js";
import { errorHandler } from "./middlewares/index.js";
import logger from "./utils/logger.js";

const app: express.Application = express();

app.use(cors({ origin: config.cors.origin }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get("/api-docs.json", (_req, res) => {
  res.json(swaggerSpec);
});

routes(app);

app.use(errorHandler);

const start = async () => {
  await connectDB();
  app.listen(config.port, () => {
    logger.info(`Server is running on port ${config.port}`);
  });
};

start();

export default app;
