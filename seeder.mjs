import Movie from "./models/Movie.mjs";
import { movies } from "./data.mjs";
import connectToDB from "./config/db.mjs";
import dotenv from "dotenv";
dotenv.config();
connectToDB();

const importMovies = async () => {
  try {
    await Movie.insertMany(movies);
    console.log("Sample movies have been added to the database");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding movies:", error);
    process.exit(1);
  }
};
const deleteMovies = async () => {
  try {
    await Movie.deleteMany();
    console.log("Movies have been deleted from the database");
    process.exit(0);
  } catch (error) {
    console.error("Error deleting movies:", error);
    process.exit(1);
  }
};
if (process.argv[2] === "-import") {
  importMovies();
} else if (process.argv[2] === "-remove") {
  deleteMovies();
}
