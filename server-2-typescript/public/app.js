"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const grpc = __importStar(require("@grpc/grpc-js"));
const protoLoader = __importStar(require("@grpc/proto-loader"));
const connect_1 = __importDefault(require("./db/connect"));
const logger_1 = __importDefault(require("./logger"));
const products_service_1 = require("./service/products.service");
const port = 3011;
const host = "localhost";
var PROTO_PATH = __dirname + "/../proto/product.proto";
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
    keepCase: false,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
});
var product_proto = grpc.loadPackageDefinition(packageDefinition).approveProduct;
//Function on server side to store approved products
const approveProduct = (call, callback) => __awaiter(void 0, void 0, void 0, function* () {
    const body = call.request.product;
    const _id = body._id;
    const existingProduct = yield (0, products_service_1.findProduct)({ _id });
    var product = null;
    if (existingProduct) {
        product = yield (0, products_service_1.findAndUpdate)({ _id }, body, { new: true });
    }
    else {
        product = yield (0, products_service_1.createProduct)(Object.assign({}, body));
    }
    if (product) {
        callback(null, { message: "product approved and stored in master db " });
    }
    else {
        callback("error");
    }
});
//Creates the new server
const server = new grpc.Server();
server.addService(product_proto.ProductsService.service, {
    approveProduct: approveProduct,
});
server.bindAsync(`${host}:${port}`, grpc.ServerCredentials.createInsecure(), () => {
    server.start();
    (0, connect_1.default)();
    logger_1.default.info(`Approval Server listing at http://${host}:${port}`);
});
