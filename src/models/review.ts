// Ansvarområde 3 - Chariklia
import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  name: { type: String, required: true },
  content: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  created_at: { type: Date, default: Date.now },
  review_id: { type: mongoose.Schema.Types.ObjectId, ref: "Book", required: true },
});

export default mongoose.model("Review", reviewSchema);