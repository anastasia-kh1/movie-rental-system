const Movie = require("../models/Movie");

const getAllMovies = async (req, res) => {
    try {
        const movies = await Movie.find();
        res.json(movies);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getMovieById = async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id);

        if (!movie) {
            return res.status(404).json({
                message: "Movie not found"
            });
        }

        res.json(movie);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const createMovie = async (req, res) => {
    try {

        const movie = new Movie(req.body);

        const savedMovie = await movie.save();

        res.status(201).json(savedMovie);

    } catch (error) {

        res.status(400).json({
            message: error.message
        });

    }
};

const updateMovie = async (req, res) => {
    try {

        const movie = await Movie.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!movie) {
            return res.status(404).json({
                message: "Movie not found"
            });
        }

        res.json(movie);

    } catch (error) {

        res.status(400).json({
            message: error.message
        });

    }
};

const deleteMovie = async (req, res) => {
    try {

        const movie = await Movie.findByIdAndDelete(
            req.params.id
        );

        if (!movie) {
            return res.status(404).json({
                message: "Movie not found"
            });
        }

        res.json({
            message: "Movie deleted successfully"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};
const searchMovies = async (req, res) => {
    try {
        const { title, genre, page = 1, limit = 5 } = req.query;

        const query = {};

        if (title) {
            query.title = { $regex: title, $options: "i" };
        }

        if (genre) {
            query.genre = genre;
        }

        const skip = (page - 1) * limit;

        const movies = await Movie.find(query)
            .skip(skip)
            .limit(Number(limit));

        const total = await Movie.countDocuments(query);

        res.json({
            totalMovies: total,
            currentPage: Number(page),
            totalPages: Math.ceil(total / limit),
            movies
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
module.exports = {
    getAllMovies,
    getMovieById,
    createMovie,
    updateMovie,
    deleteMovie,
    searchMovies
};