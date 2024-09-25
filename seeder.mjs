import Movie from "./models/Movie.mjs";
import Screen from "./models/Screen.mjs";
import Room from "./models/Room.mjs";
import { screenings } from "./screenData.mjs";
import { movies } from "./data.mjs";
import { rooms } from "./roomData.mjs";
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
const importScreens = async () => {
  try {
    await Screen.insertMany(screenings);
    console.log("Sample screenings have been added to the database");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding movies:", error);
    process.exit(1);
  }
};
const removeScreens = async () => {
  try {
    await Screen.deleteMany();
    console.log("screenings have been deleted from the database");
    process.exit(0);
  } catch (error) {
    console.error("Error deleting screenings:", error);
    process.exit(1);
  }
};
const importRooms = async () => {
  try {
    await Room.insertMany(rooms);
    console.log("Sample rooms have been added to the database");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding rooms:", error);
    process.exit(1);
  }
};
const removeRooms = async () => {
  try {
    await Room.deleteMany();
    console.log("rooms have been deleted from the database");
    process.exit(0);
  } catch (error) {
    console.error("Error deleting rooms:", error);
    process.exit(1);
  }
};
if (process.argv[2] === "-import") {
  importMovies();
} else if (process.argv[2] === "-remove") {
  deleteMovies();
} else if (process.argv[2] === "-importScreens") {
  importScreens();
} else if (process.argv[2] === "-removeScreens") {
  removeScreens();
} else if (process.argv[2] === "-importRooms") {
  importRooms();
} else if (process.argv[2] === "-removeRooms") {
  removeRooms();
}
