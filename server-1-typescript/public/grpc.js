"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.approveProductGrpc = void 0;
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const PROTO_PATH = __dirname + "/../../server-2-typescript/proto/product.proto";
const packageDefinition = protoLoader.loadSync(PROTO_PATH, { keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
});
const product_proto = grpc.loadPackageDefinition(packageDefinition).approveProduct;
function approveProductGrpc(product) {
    const target = 'localhost:3011';
    const client = new product_proto.ProductsService(target, grpc.credentials.createInsecure());
    client.approveProduct({ product: product }, function (err, response) {
        console.log("Response from Approval Service >>" + response.message);
    });
}
exports.approveProductGrpc = approveProductGrpc;
