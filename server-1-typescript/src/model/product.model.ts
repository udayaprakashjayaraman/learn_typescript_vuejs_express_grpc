import mongoose from "mongoose";

export interface ProductDocument extends mongoose.Document {
  title: string;
  body: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema = new mongoose.Schema(
  {
    title: { type: String },
    body: { type: String },
    status: { type: String, enum: ["approved", "pending"] },
  },
  { timestamps: true }
);

const Product = mongoose.model<ProductDocument>("Product", ProductSchema);

export default Product;
