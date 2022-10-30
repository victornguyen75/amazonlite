import ProductModel from "models/Product";
import UserModel from "models/User";
import { db, data } from "utils";

export default async function handler(req, res) {
  await db.connect();
  await UserModel.deleteMany();
  await UserModel.insertMany(data.users); // can't figure out the type issue here
  await ProductModel.deleteMany();
  await ProductModel.insertMany(data.products); // can't figure out the type issue here
  await db.disconnect();
  res.send({ message: "seeded successfully" });
}
