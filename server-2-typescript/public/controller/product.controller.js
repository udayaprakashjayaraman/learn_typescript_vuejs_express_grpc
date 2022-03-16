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
exports.approveProductHandler = void 0;
const lodash_1 = require("lodash");
const products_service_1 = require("../service/products.service");
function approveProductHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const _id = (0, lodash_1.get)(req, "params._id");
        const product = yield (0, products_service_1.findProduct)({ _id });
        if (!product) {
            return res.sendStatus(404);
        }
        const approveProduct = yield (0, products_service_1.findAndUpdate)({ _id }, { status: 'approved' }, { new: true });
        if (approveProduct) {
            return res.sendStatus(200);
        }
        else {
            return res.sendStatus(409);
        }
    });
}
exports.approveProductHandler = approveProductHandler;
