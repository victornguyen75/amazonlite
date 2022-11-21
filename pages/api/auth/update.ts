// @ts-nocheck for UserModel.findById() on line 33
import bcryptjs from "bcryptjs";
import { getSession } from "next-auth/react";
import UserModel from "models/User";
import { db } from "utils";

export default async function handler(req, res) {
  if (req.method !== "PUT") {
    return res
      .status(400)
      .send({ message: `${req.mmethod} is not supported.` });
  }

  const session = await getSession({ req });
  if (!session) {
    return res.status(401).send({ message: "Sign in required" });
  }

  const { user } = session;

  const { name, email, password } = req.body;

  if (
    !name ||
    !email ||
    !email.includes("@") ||
    (password && password.trim().length < 5)
  ) {
    res.status(422).json({ message: "Validation error." });
    return;
  }

  await db.connect();
  const updatedUser = await UserModel.findById(user?._id);
  updatedUser.name = name;
  updatedUser.email = email;

  if (password) {
    updatedUser.password = bcryptjs.hashSync(password);
  }

  await updatedUser.save();
  await db.disconnect();
  res.send({ message: "User updated successfully." });
}
