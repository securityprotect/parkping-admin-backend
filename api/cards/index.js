import { connectDB } from "../../lib/db.js";
import Card from "../../lib/Card.js";

export default async function handler(req, res) {
  try {
    await connectDB();

    if (req.method === "GET") {
      const cards = await Card.find({});
      return res.status(200).json(cards);
    }

    return res.status(405).json({ message: "Method not allowed" });
  } catch (error) {
    console.error("API error:", error);
    return res.status(500).json({ message: "Server error" });
  }
}
