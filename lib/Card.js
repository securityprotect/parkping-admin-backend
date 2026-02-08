import mongoose from "mongoose";

const CardSchema = new mongoose.Schema({
  cardNumber: String,
  holderName: String,
  issueDate: Date,
  expiryDate: Date,
  status: {
    type: String,
    enum: ["Active", "Inactive"],
    default: "Active"
  }
});

export default mongoose.models.Card || mongoose.model("Card", CardSchema);
