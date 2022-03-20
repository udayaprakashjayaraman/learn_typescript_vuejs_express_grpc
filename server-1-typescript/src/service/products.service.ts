import {
  DocumentDefinition,
  FilterQuery,
  UpdateQuery,
  QueryOptions,
} from "mongoose";
import Product, { ProductDocument } from "../model/product.model";

export function createProduct(input: DocumentDefinition<ProductDocument>) {
  return Product.create(input);
}

export function findAllProducts(
  query: FilterQuery<ProductDocument>,
  options: QueryOptions = { lean: true }
  ) {
  return Product.find(query);
}

export function findProduct(
  query: FilterQuery<ProductDocument>,
  options: QueryOptions = { lean: true }
) {
  return Product.findOne(query, {}, options);
}

export function findAndUpdate(
  query: FilterQuery<ProductDocument>,
  update: UpdateQuery<ProductDocument>,
  options: QueryOptions
) {
  return Product.findOneAndUpdate(query, update, options);
}
