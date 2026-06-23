const Rental = require("../models/Rental");
const Movie = require("../models/Movie");

const getAllRentals = async (req, res) => {
    try {
        const rentals = await Rental.find()
            .populate("userId")
            .populate("movieId");

        res.json(rentals);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createRental = async (req, res) => {
    try {
        const movie = await Movie.findById(req.body.movieId);

        if (!movie) {
            return res.status(404).json({ message: "Movie not found" });
        }

        if (movie.availableCopies <= 0) {
            return res.status(400).json({ message: "No copies available" });
        }

        movie.availableCopies -= 1;
        await movie.save();

        const rental = new Rental({
            userId: req.body.userId,
            movieId: req.body.movieId
        });

        const savedRental = await rental.save();

        res.status(201).json(savedRental);

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const returnMovie = async (req, res) => {
    try {
        const rental = await Rental.findById(req.params.id);

        if (!rental) {
            return res.status(404).json({ message: "Rental not found" });
        }

        if (rental.status === "RETURNED") {
            return res.status(400).json({ message: "Already returned" });
        }

        rental.status = "RETURNED";
        rental.returnDate = new Date();
        await rental.save();

        const movie = await Movie.findById(rental.movieId);
        if (movie) {
            movie.availableCopies += 1;
            await movie.save();
        }

        res.json(rental);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllRentals,
    createRental,
    returnMovie
};