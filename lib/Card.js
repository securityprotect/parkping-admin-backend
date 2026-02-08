import mongoose from "mongoose";

const CardSchema = new mongoose.Schema(
  {
    cardNumber: String,
    ownerName: String,
    planType: String,
    vehicleNumber: String,
    activationDate: String,
    expiryDate: String,
    mobile: String,
    status: String,
  },
  { collection: "cards" } // 🔥 VERY IMPORTANT
);

export default mongoose.models.Card ||
  mongoose.model("Card", CardSchema);
