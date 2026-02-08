import { connectDB } from "../lib/db.js";
import Card from "../lib/Card.js";
import { verifyAuth } from "../lib/auth.js";


export default async function handler(req, res) {
  try {
    verifyAuth(req);
    await connectDB();

    const total = await Card.countDocuments();
    const active = await Card.countDocuments({ status: "Active" });
    const nearExpiry = await Card.countDocuments({
      expiryDate: { $lte: new Date(Date.now() + 30 * 86400000) }
    });

    res.json({ total, active, nearExpiry });
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
}

