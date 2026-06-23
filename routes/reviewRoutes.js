const express = require("express");

const router = express.Router();

const {
    getAllReviews,
    getReviewsByMovie,
    createReview
} = require("../controllers/reviewController");

router.get("/", getAllReviews);

router.get("/movie/:movieId", getReviewsByMovie);

router.post("/", createReview);

module.exports = router;