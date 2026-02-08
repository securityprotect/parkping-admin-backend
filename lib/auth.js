import jwt from "jsonwebtoken";

export function verifyAuth(req) {
  const auth = req.headers.authorization;
  if (!auth) throw new Error("Unauthorized");

  const token = auth.split(" ")[1];
  jwt.verify(token, process.env.JWT_SECRET);
}
