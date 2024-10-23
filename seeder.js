const { Movie } = require("./models/Movie");
const { Screen } = require("./models/Screen");
const { Room } = require("./models/Room");

const { screenings } = require("./screenData");
const { movies } = require("./data");
const { rooms } = require("./roomData");
const connectToDB = require("./config/db");
const dotenv = require("dotenv");

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

const removeMovies = async () => {
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
    console.error("Error seeding screenings:", error);
    process.exit(1);
  }
};

const removeScreens = async () => {
  try {
    await Screen.deleteMany();
    console.log("Screenings have been deleted from the database");
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
    console.log("Rooms have been deleted from the database");
    process.exit(0);
  } catch (error) {
    console.error("Error deleting rooms:", error);
    process.exit(1);
  }
};

const main = () => {
  const action = process.argv[2];

  if (action === "-import") {
    importMovies();
  } else if (action === "-remove") {
    removeMovies();
  } else if (action === "-importScreens") {
    importScreens();
  } else if (action === "-removeScreens") {
    removeScreens();
  } else if (action === "-importRooms") {
    importRooms();
  } else if (action === "-removeRooms") {
    removeRooms();
  } else {
    console.error("Invalid command. Use -import or -remove.");
    process.exit(1);
  }
};

main();
