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
            res.status(404).json({ message: 'Review not found' });
            return;
        }
        res.json(review);
    } catch (e) {
        res.status(500).json({ message: 'Something went wrong', error: e });
    }
};

