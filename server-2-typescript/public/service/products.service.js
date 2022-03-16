"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findAndUpdate = exports.createProduct = exports.findProduct = void 0;
const product_model_1 = __importDefault(require("../model/product.model"));
function findProduct(query, options = { lean: true }) {
    return product_model_1.default.findOne(query, {}, options);
}
exports.findProduct = findProduct;
function createProduct(input) {
    return product_model_1.default.create(input);
}
exports.createProduct = createProduct;
function findAndUpdate(query, update, options) {
    return product_model_1.default.findOneAndUpdate(query, update, options);
}
exports.findAndUpdate = findAndUpdate;
