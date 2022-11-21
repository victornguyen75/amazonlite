// @ts-nocheck for OrderModel.findById() at line 13
import { getSession } from "next-auth/react";
import OrderModel from "models/Order";
import { db } from "utils";

export default async function handler(req, res) {
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).send("Error: sign in required");
  }

  await db.connect();
  const order = await OrderModel.findById(req.query.id);
  await db.disconnect();
  res.send(order);
}
