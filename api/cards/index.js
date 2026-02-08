import { connectDB } from "../../lib/db";
import Card from "../../lib/Card";
import { verifyAuth } from "../../lib/auth";

export default async function handler(req, res) {
  try {
    verifyAuth(req);
    await connectDB();

    if (req.method === "GET") {
      const cards = await Card.find();
      return res.status(200).json(cards);
    }

    if (req.method === "POST") {
      const card = await Card.create(req.body);
      return res.status(201).json(card);
    }

    res.status(405).end();
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
}
