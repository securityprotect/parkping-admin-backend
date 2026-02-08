import { connectDB } from "../lib/db.js";
import Card from "../lib/Card.js";
import { verifyAuth } from "../lib/auth.js";

export default async function handler(req, res) {
  try {
    const auth = verifyAuth(req);
    if (!auth.ok) {
      return res.status(401).json({ message: auth.message });
    }

    await connectDB();

    const total = await Card.countDocuments();
    const active = await Card.countDocuments({ status: "Active" });

    res.json({ total, active });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
