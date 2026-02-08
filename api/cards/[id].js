import { connectDB } from "../../lib/db";
import Card from "../../lib/Card";
import { verifyAuth } from "../../lib/auth";

export default async function handler(req, res) {
  try {
    verifyAuth(req);
    await connectDB();

    const { id } = req.query;

    if (req.method === "PUT") {
      const updated = await Card.findByIdAndUpdate(id, req.body, { new: true });
      return res.json(updated);
    }

    if (req.method === "DELETE") {
      await Card.findByIdAndDelete(id);
      return res.json({ message: "Deleted" });
    }

    res.status(405).end();
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
}
