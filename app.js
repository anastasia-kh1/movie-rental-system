const express = require("express");
const connectDB = require("./config/database");

const movieRoutes = require("./routes/movieRoutes");

const app = express();

app.use(express.json());

connectDB();

app.use("/movies", movieRoutes);

app.listen(3000, () => {
    console.log("Server running on port 3000");
});