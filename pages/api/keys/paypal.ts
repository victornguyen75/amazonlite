import { getSession } from "next-auth/react";

export default async function handler(req, res) {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).send("Error: sign in required");
  }

  res.send(process.env.PAYPAL_CLIENT_ID || "sb");
}
