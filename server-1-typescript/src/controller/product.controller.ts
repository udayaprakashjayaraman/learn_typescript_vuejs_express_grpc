import { Request, Response } from "express";
import { get } from "lodash";
import {
  createProduct,
  findAllProducts,
  findProduct,
  findAndUpdate,
  deleteProduct,
} from "../service/products.service";

export async function getAllProductHandler(req: Request, res: Response) {
  const products = await findAllProducts();
  return res.send(products);
}

export async function getProductHandler(req: Request, res: Response) {
  const _id = get(req, "params._id");
  const product = await findProduct({ _id });

  if (!product) {
    return res.sendStatus(404);
  }

  return res.send(product);
}

export async function createProductHandler(req: Request, res: Response) {
  console.log("createProductHandler")
  const body = req.body;
  const product = await createProduct({ ...body});
  console.log("product", product);
  if(product){
    return res.send(product);
  }else{
    return res.sendStatus(409);
  }
}

export async function updateProductHandler(req: Request, res: Response) {
  const _id = get(req, "params._id");
  const update = req.body;

  const product = await findProduct({ _id: _id });

  if (!product) {
    return res.sendStatus(404);
  }

  const updatedProduct = await findAndUpdate({ _id }, update, { new: true });

  return res.send(updatedProduct);
}

export async function approveProductHandler(req: Request, res: Response) {
  const _id = get(req, "params._id");
  const product = await findProduct({ _id });

  if (!product) {
    return res.sendStatus(404);
  }

  const approveProduct = await findAndUpdate({ _id }, {status: 'approved'}, { new: true });
  if(approveProduct){
    return res.sendStatus(200);  
  }else{
    return res.sendStatus(409);
  }
}