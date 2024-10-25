import {
  prisma
} from "./chunk-JV6GRE7Y.mjs";

// src/controllers/LoginController.ts
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
async function login(req, res) {
  const { email, password } = req.body;
  1;
  try {
    let user = await prisma.user.findUnique({
      where: {
        email
      },
      include: {
        producer: true
      }
    });
    if (!user)
      return res.status(404).json({ messageError: "Client not found" });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ messageError: "Invalid password" });
    const secret = process.env.SECRET;
    const token = jwt.sign({ id: user.id, role: user.role, producerId: user.producer?.id }, secret);
    res.cookie("a54", token, {
      maxAge: 12096e5,
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      path: "/"
    });
    console.log(token);
    return res.status(200).send({ message: "Authentication completed successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ messageError: "Internal Server Error" });
  }
}

export {
  login
};
