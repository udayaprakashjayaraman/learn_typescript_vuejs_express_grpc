import express from "express";
import log from "./logger";
import connect from "./db/connect";
import routes from "./routes";

const port = 3010 as number;
const host = "localhost" as string;

const app = express();
const cors = require('cors')

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors()) // Use this after the variable declaration

app.listen(port, host, () => {
  log.info(`Server listing at http://${host}:${port}`);
  connect();
  routes(app);
});
