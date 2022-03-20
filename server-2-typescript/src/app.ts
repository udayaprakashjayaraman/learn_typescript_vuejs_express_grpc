import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import connect from "./db/connect";
import log from "./logger";
import {
  findProduct,
  findAndUpdate,
  createProduct,
} from "./service/products.service";

const port: number = 3011;
const host: string = "localhost";
var PROTO_PATH = __dirname + "/../proto/product.proto";

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: false,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});
var product_proto: any =
  grpc.loadPackageDefinition(packageDefinition).approveProduct;

//Function on server side to store approved products
const approveProduct = async (call: any, callback: any) => {
  const body = call.request.product;
  const _id = body._id;
  const existingProduct = await findProduct({ _id });
  var product = null;
  if (existingProduct) {
    product = await findAndUpdate({ _id }, body, { new: true });
  } else {
    product = await createProduct({ ...body });
  }
  if (product) {
    callback(null, { message: "product approved and stored in master db " });
  } else {
    callback("error");
  }
};
//Creates the new server
const server = new grpc.Server();

server.addService(product_proto.ProductsService.service, {
  approveProduct: approveProduct,
});

server.bindAsync(
  `${host}:${port}`,
  grpc.ServerCredentials.createInsecure(),
  () => {
    server.start();
    connect();
    log.info(`Approval Server listing at http://${host}:${port}`);
  }
);
