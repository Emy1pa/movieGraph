const express = require("express");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
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
const commentRoutes = require("./routes/commentRoutes");
const rateRoutes = require("./routes/rateRoutes");
const statistics = require("./routes/statisticsRoute");
const favoriteRoutes = require("./routes/favoriteRoutes");
const helmet = require("helmet");
const cors = require("cors");

connectToDB();
const app = express();
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Cinema Management System API",
      version: "1.0.0",
      description: "API for the cinema management system",
      contact: {
        email: "souaouti.iman@gmail.com",
      },
    },
    servers: [
      {
        url: process.env.SERVER_URL || "http://localhost:8800",
        description: "Development server",
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
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
app.use("/api/comments", commentRoutes);
app.use("/api/rates", rateRoutes);
app.use("/api/favorites", favoriteRoutes);
app.use("/api/statistics", statistics);
app.use("/password", passwordRoutes);
app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(
    `Server is running in ${process.env.MODE_ENV} mode on port ${port}`
  );
});
