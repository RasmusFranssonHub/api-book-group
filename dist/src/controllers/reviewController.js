const Review = require("../models/review");

const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find();
    res.json(reviews);
  } catch (e) {
    res.status(500).json({ message: "Something went wrong", error: e });
  }
};

const getReviewById = async (req, res) => {
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

const createReview = async (req, res) => {
  const { name, content, rating, review_id } = req.body;
  if (!name || !content || !rating || !review_id) {
    res
      .status(400)
      .json({ message: "name, content, rating and review_id are required" });
    return;
  }
  try {
    const review = await Review.create({ name, content, rating, review_id });
    res.status(201).json(review);
  } catch (e) {
    res.status(500).json({ message: "Something went wrong", error: e });
  }
};

const updateReview = async (req, res) => {
  try {
    const review = await Review.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!review) {
      res.status(404).json({ message: "Review not found" });
      return;
    }
    res.json(review);
  } catch (e) {
    res.status(500).json({ message: "Something went wrong", error: e });
  }
};
