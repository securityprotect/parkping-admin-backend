import jwt from "jsonwebtoken";

export function verifyAuth(req) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return { ok: false, message: "No token provided" };
  }

  const parts = authHeader.split(" ");
  if (parts.length !== 2) {
    return { ok: false, message: "Token format invalid" };
  }

  const token = parts[1];

  try {
    jwt.verify(token, process.env.JWT_SECRET);
    return { ok: true };
  } catch (err) {
    return { ok: false, message: "Token invalid" };
  }
}
