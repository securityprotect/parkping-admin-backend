import { connectDB } from "../../../lib/db.js";
import Card from "../../../lib/Card.js";
import { verifyAuth } from "../../../lib/auth.js";

export default async function handler(req, res) {
  try {
    const auth = verifyAuth(req);
    if (!auth.ok) {
      return res.status(401).json({ message: auth.message });
    }

    await connectDB();

    if (req.method === "GET") {
      const cards = await Card.find();
      return res.status(200).json(cards);
    }

    if (req.method === "POST") {
      const card = await Card.create(req.body);
      return res.status(201).json(card);
    }

    return res.status(405).end();
  } catch (err) {
    console.error("API ERROR:", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
