import { connectDB } from "../../lib/db.js";
import Card from "../../lib/Card.js";
import { verifyAuth } from "../../lib/auth.js";

export default async function handler(req, res) {
  try {
    const auth = verifyAuth(req);
    if (!auth.ok) {
      return res.status(401).json({ message: auth.message });
    }

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

    return res.status(405).end();
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

