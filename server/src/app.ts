import express from "express";
import routes from "./routes/index.js";
import logger from "./utils/logger.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}.`);
  routes(app);
});
