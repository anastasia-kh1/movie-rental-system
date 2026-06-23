const Review = require("../models/Review");

const getTopMovies = async (req, res) => {
    try {
        const result = await Review.aggregate([
            {
                $group: {
                    _id: "$movieId",
                    avgRating: { $avg: "$rating" },
                    totalReviews: { $sum: 1 }
                }
            },
            { $sort: { avgRating: -1 } },
            { $limit: 5 }
        ]);

        res.json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getTopUsers = async (req, res) => {
    try {
        const result = await Review.aggregate([
            {
                $group: {
                    _id: "$userId",
                    totalReviews: { $sum: 1 },
                    avgRatingGiven: { $avg: "$rating" }
                }
            },
            { $sort: { totalReviews: -1 } },
            { $limit: 5 }
        ]);

        res.json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getTopMovies,
    getTopUsers
};