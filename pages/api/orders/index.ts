import { getSession } from "next-auth/react";
import OrderModel from "models/Order";
import { db } from "utils";

export default async function handler(req, res) {
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).send("Sign in required");
  }

  const { user } = session;
  await db.connect();
  const newOrder = new OrderModel({
    ...req.body,
    user: user._id,
  });

  const order = await newOrder.save();
  res.status(201).send(order);
}
