"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const logger_1 = __importDefault(require("./logger"));
const connect_1 = __importDefault(require("./db/connect"));
const routes_1 = __importDefault(require("./routes"));
const port = 3010;
const host = "localhost";
const app = (0, express_1.default)();
const cors = require('cors');
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(cors()); // Use this after the variable declaration
app.listen(port, host, () => {
    logger_1.default.info(`Server listing at http://${host}:${port}`);
    (0, connect_1.default)();
    (0, routes_1.default)(app);
});
