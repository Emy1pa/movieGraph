import express from "express";
import dotenv from "dotenv";
dotenv.config();
import connectToDB from "./config/db.mjs";
import { notFound, errorHandler } from "./middlewares/errors.mjs";
import subadminRoutes from "./routes/subadminRoutes.mjs";
import userRoutes from "./routes/userRoutes.mjs";
import passwordRoutes from "./routes/passwordRoute.mjs";
import movieRoutes from "./routes/movieRoutes.mjs";
import roomRoutes from "./routes/roomRoutes.mjs";
import reservationRoutes from "./routes/reservationRoutes.mjs";
import screenRoutes from "./routes/screenRoutes.mjs";
import helmet from "helmet";
import cors from "cors";
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
