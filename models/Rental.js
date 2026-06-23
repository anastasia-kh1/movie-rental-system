const mongoose = require("mongoose");

const rentalSchema = new mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    movieId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Movie",
        required: true
    },

    rentalDate: {
        type: Date,
        default: Date.now
    },

    returnDate: {
        type: Date
    },

    status: {
        type: String,
        enum: ["ACTIVE", "RETURNED"],
        default: "ACTIVE"
    }
});

module.exports = mongoose.model("Rental", rentalSchema);