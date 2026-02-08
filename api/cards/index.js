import { connectDB } from "../../lib/db.js";
import Card from "../../models/Card.js";

export default async function handler(req, res) {
  try {
    await connectDB();

    const cards = await Card.find({});
    return res.status(200).json(cards);
  } catch (err) {
    return res.status(500).json({ message: "Server error", error: err.message });
  }
}
