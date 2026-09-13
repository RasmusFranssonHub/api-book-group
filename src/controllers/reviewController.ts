// Ansvarsområde 3 - Chariklia
import { Request, Response } from "express";
import Review from "../models/review";
import { Book } from "../models/Book";

export const getAllReviews = async (req: Request, res: Response) => {
  try {
    const reviews = await Review.find();
    res.json(reviews);
  } catch (e) {
    res.status(500).json({ message: "Something went wrong", error: e });
  }
};

export const getReviewById = async (req: Request, res: Response) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) {
      res.status(404).json({ message: "Review not found" });
      return;
    }
    res.json(review);
  } catch (e) {
    res.status(500).json({ message: "Something went wrong", error: e });
  }
};

export const createReview = async (req: Request, res: Response) => {
  const { name, content, rating, book_id } = req.body;
  if (!name || !content || !rating || !book_id) {
    res.status(400).json({ message: "name, content, rating and book_id are required" });
    return;
  }
  if (rating <1 || rating >5) {
    res.status(400).json({ message: "rating must be between 1 and 5" });
    return;
  }
  try {
    const bookExists = await Book.findById(book_id);
    if (!bookExists) {
      res.status(404).json({ message: "Book not found" });
      return;
    }
    const review = await Review.create({ name, content, rating, book_id });
    res.status(201).json(review);
  } catch (e) {
    res.status(500).json({ message: "Something went wrong", error: e });
  }
};

export const updateReview = async (req: Request, res: Response) => {
  try {
    const review = await Review.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!review) {
      res.status(404).json({ message: "Review not found" });
      return;
    }
    res.json(review);
  } catch (e) {
    res.status(500).json({ message: "Something went wrong", error: e });
  }
};

export const deleteReview = async (req: Request, res: Response) => {
  try {
    const review = await Review.findByIdAndDelete(req.params.id);
    if (!review) {
      res.status(404).json({ message: "Review not found" });
      return;
    }
    res.json({ message: "Review deleted" });
  } catch (e) {
    res.status(500).json({ message: "Something went wrong", error: e });
  }
};