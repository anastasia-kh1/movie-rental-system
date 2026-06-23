const express = require("express");
const connectDB = require("./config/database");

const movieRoutes = require("./routes/movieRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();

app.use(express.json());

connectDB();

app.use("/movies", movieRoutes);
app.use("/users", userRoutes);

app.listen(3000, () => {
    console.log("Server running on port 3000");
});