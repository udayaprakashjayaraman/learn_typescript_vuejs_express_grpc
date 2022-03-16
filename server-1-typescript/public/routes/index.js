"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const product_controller_1 = require("../controller/product.controller");
function default_1(app) {
    app.get("/api/products", product_controller_1.getAllProductHandler);
    app.get("/api/products/:_id", product_controller_1.getProductHandler);
    app.put("/api/products/add", product_controller_1.createProductHandler);
    app.post("/api/products/update", product_controller_1.updateProductHandler);
    app.get("/api/products/approve/:_id", product_controller_1.approveProductHandler);
}
exports.default = default_1;
