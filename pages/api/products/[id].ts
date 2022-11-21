// @ts-nocheck for ProductModel.findById() for line 7
import ProductModel from "models/Product";
import { db } from "utils";

export default async function handler(req, res) {
  await db.connect();
  const product = await ProductModel.findById(req.query.id);
  await db.disconnect();
  res.send(product);
}
