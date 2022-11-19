import { getSession } from "next-auth/react";
import Order from "models/Order";
import { db } from "utils";

export default async function handler(req, res) {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).send("Error: sign in required");
  }

  await db.connect();

  const order = await Order.findById(req.query.id);
  if (order) {
    if (order.isPaid) {
      return res
        .status(400)
        .send({ message: "Error: the order has already been paid." });
    }
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      email_address: req.body.email_address,
    };

    const paidOrder = await order.save();
    await db.disconnect();
    res.send({
      message: "The order has been paid successfully.",
      order: paidOrder,
    });
  } else {
    await db.disconnect();
    res.status(404).send({ message: "Error: the order was not found" });
  }
}
