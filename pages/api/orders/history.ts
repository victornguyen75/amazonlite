import { getSession } from "next-auth/react";
import Order from "models/Order";
import { db } from "utils";

export default async function handler(req, res) {
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).send({ message: "Error: sign in required" });
  }

  const { user } = session;
  await db.connect();
  const orders = await Order.find({ user: user._id });
  await db.disconnect();
  res.send(orders);
}
