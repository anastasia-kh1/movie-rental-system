const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },

    genre: {
        type: String,
        required: true
    },

    releaseYear: {
        type: Number
    },

    director: {
        type: String
    },

    availableCopies: {
        type: Number,
        default: 0
    },

    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Movie", movieSchema);