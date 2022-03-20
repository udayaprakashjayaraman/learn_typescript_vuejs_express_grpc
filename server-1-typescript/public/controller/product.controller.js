"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.approveProductHandler = exports.updateProductHandler = exports.createProductHandler = exports.getProductHandler = exports.getAllProductHandler = void 0;
const lodash_1 = require("lodash");
const products_service_1 = require("../service/products.service");
const grpc_1 = require("../grpc");
function getAllProductHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        var query = {};
        if (req.query.title !== "") {
            query = req.query;
        }
        const products = yield (0, products_service_1.findAllProducts)(query);
        return res.send(products);
    });
}
exports.getAllProductHandler = getAllProductHandler;
function getProductHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const _id = (0, lodash_1.get)(req, "params._id");
        const product = yield (0, products_service_1.findProduct)({ _id });
        if (!product) {
            return res.sendStatus(404);
        }
        return res.send(product);
    });
}
exports.getProductHandler = getProductHandler;
function createProductHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const body = req.body;
        const product = yield (0, products_service_1.createProduct)(Object.assign({}, body));
        if (product) {
            return res.send(product);
        }
        else {
            return res.sendStatus(409);
        }
    });
}
exports.createProductHandler = createProductHandler;
function updateProductHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const _id = req.body._id;
        const update = req.body;
        const product = yield (0, products_service_1.findProduct)({ _id });
        if (!product) {
            return res.sendStatus(404);
        }
        const updatedProduct = yield (0, products_service_1.findAndUpdate)({ _id }, update, { new: true });
        return res.send(updatedProduct);
    });
}
exports.updateProductHandler = updateProductHandler;
function approveProductHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const _id = (0, lodash_1.get)(req, "params._id");
        const product = yield (0, products_service_1.findProduct)({ _id });
        if (!product) {
            return res.sendStatus(404);
        }
        const approveProduct = yield (0, products_service_1.findAndUpdate)({ _id }, { status: "approved" }, { new: true });
        if (approveProduct) {
            (0, grpc_1.approveProductGrpc)(approveProduct);
            return res.sendStatus(200);
        }
        else {
            return res.sendStatus(409);
        }
    });
}
exports.approveProductHandler = approveProductHandler;
