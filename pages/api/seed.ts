import Product from "models/Product";
import User from "models/User";
import { db, data } from "utils";

const handler = async (req, res) => {
  await db.connect();
  await User.deleteMany();
  await User.insertMany(data.users); // can't figure out the type issue here
  await Product.deleteMany();
  await Product.insertMany(data.products); // can't figure out the type issue here
  await db.disconnect();
  res.send({ message: "seeded successfully" });
};

export default handler;
