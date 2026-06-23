const Review = require("../models/Review");

const getAllReviews = async (req, res) => {
    try {
        const reviews = await Review.find()
            .populate("userId")
            .populate("movieId");

        res.json(reviews);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const getReviewsByMovie = async (req, res) => {
    try {

        const reviews = await Review.find({
            movieId: req.params.movieId
        })
            .populate("userId")
            .populate("movieId");

        res.json(reviews);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const createReview = async (req, res) => {
    try {

        const review = new Review({
            userId: req.body.userId,
            movieId: req.body.movieId,
            rating: req.body.rating,
            comment: req.body.comment
        });

        const savedReview = await review.save();

        res.status(201).json(savedReview);

    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};

module.exports = {
    getAllReviews,
    getReviewsByMovie,
    createReview
};