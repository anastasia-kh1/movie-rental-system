const express = require("express");

const router = express.Router();

const {
    getAllRentals,
    createRental,
    returnMovie
} = require("../controllers/rentalController");

router.get("/", getAllRentals);

router.post("/", createRental);

router.put("/:id/return", returnMovie);

module.exports = router;