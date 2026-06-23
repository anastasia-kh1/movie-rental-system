const express = require("express");
const router = express.Router();

const {
    getTopMovies,
    getTopUsers
} = require("../controllers/analyticsController");

router.get("/top-movies", getTopMovies);
router.get("/top-users", getTopUsers);

module.exports = router;