// Ansvarsområde 2 — Oscar
import { Schema, model } from "mongoose";

const bookSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    author: { type: String, required: true, trim: true },
    genres: [String],
    image: { type: String },
    published_year: { type: Number, min: 1450 },
  },
  { timestamps: true },
);

export const Book = model("Book", bookSchema);
