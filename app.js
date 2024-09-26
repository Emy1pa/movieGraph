const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const connectToDB = require("./config/db");
const { notFound, errorHandler } = require("./middlewares/errors");
const subadminRoutes = require("./routes/subadminRoutes");
const userRoutes = require("./routes/userRoutes");
const passwordRoutes = require("./routes/passwordRoute");
const movieRoutes = require("./routes/movieRoutes");
const roomRoutes = require("./routes/roomRoutes");
const reservationRoutes = require("./routes/reservationRoutes");
const screenRoutes = require("./routes/screenRoutes");
const helmet = require("helmet");
const cors = require("cors");

connectToDB();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(cors());

// View Engine
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/api/admin", subadminRoutes);
app.use("/api/auth", userRoutes);
app.use("/api/movies", movieRoutes);
app.use("/api/rooms", roomRoutes);
app.use("/api/screenings", screenRoutes);
app.use("/api/reservations", reservationRoutes);
app.use("/password", passwordRoutes);
app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(
    `Server is running in ${process.env.MODE_ENV} mode on port ${port}`
  );
});
