const express = require("express");
const connectDB = require("./config/database");

const movieRoutes = require("./routes/movieRoutes");
const userRoutes = require("./routes/userRoutes");
const rentalRoutes = require("./routes/rentalRoutes");

const app = express();

app.use(express.json());

connectDB();

app.use("/movies", movieRoutes);
app.use("/users", userRoutes);
app.use("/rentals", rentalRoutes);

app.listen(3000, () => {
    console.log("Server running on port 3000");
});