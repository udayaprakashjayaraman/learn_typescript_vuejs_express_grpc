import { Express } from "express";
import {
  createProductHandler,
  updateProductHandler,
  getAllProductHandler,
  getProductHandler,
  approveProductHandler,
} from "../controller/product.controller";

export default function (app: Express) {
  app.get("/api/products", getAllProductHandler);

  app.get("/api/products/:_id", getProductHandler);

  app.put("/api/products/add", createProductHandler);

  app.post("/api/products/update", updateProductHandler);

  app.get("/api/products/approve/:_id", approveProductHandler);
}
