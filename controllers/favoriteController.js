const { Favorite } = require("../models/Favorite");
const { User } = require("../models/User");
const { Movie } = require("../models/Movie");
const mongoose = require("mongoose");

async function addFavorite(req, res) {
  try {
    const { user, movie } = req.body;

    if (!user || !movie) {
      return res
        .status(400)
        .json({ message: "User and movie IDs are required." });
    }

    if (
      !mongoose.Types.ObjectId.isValid(user) ||
      !mongoose.Types.ObjectId.isValid(movie)
    ) {
      return res.status(400).json({ message: "Invalid user or movie ID." });
    }

    const existingUser = await User.findById(user);
    if (!existingUser) {
      return res.status(404).json({ message: "User not found." });
    }

    const existingMovie = await Movie.findById(movie);
    if (!existingMovie) {
      return res.status(404).json({ message: "Movie not found." });
    }

    const existingFavorite = await Favorite.findOne({
      user: new mongoose.Types.ObjectId(user),
      movie: new mongoose.Types.ObjectId(movie),
    });

    if (existingFavorite) {
      return res
        .status(400)
        .json({ message: "Movie is already in favorites." });
    }

    const favorite = new Favorite({ user, movie });
    await favorite.save();

    res.status(201).json(favorite);
  } catch (error) {
    console.error("Error adding favorite:", error);
    res
      .status(500)
      .json({ message: "Something went wrong.", error: error.message });
  }
}

async function removeFavorite(req, res) {
  try {
    const { user, movie } = req.body;

    if (!user || !movie) {
      return res
        .status(400)
        .json({ message: "User and movie IDs are required." });
    }

    if (
      !mongoose.Types.ObjectId.isValid(user) ||
      !mongoose.Types.ObjectId.isValid(movie)
    ) {
      return res.status(400).json({ message: "Invalid user or movie ID." });
    }

    const favorite = await Favorite.findOneAndDelete({
      user: new mongoose.Types.ObjectId(user),
      movie: new mongoose.Types.ObjectId(movie),
    });

    if (!favorite) {
      return res.status(404).json({ message: "Favorite not found." });
    }

    res.status(200).json({ message: "Movie has been removed from favorites." });
  } catch (error) {
    console.error("Error removing favorite:", error);
    res
      .status(500)
      .json({ message: "Something went wrong.", error: error.message });
  }
}

module.exports = {
  addFavorite,
  getUserFavorites,
  removeFavorite,
};

async function getUserFavorites(req, res) {
  try {
    const favorites = await Favorite.find({ user: req.params.userId }).populate(
      "movie"
    );
    if (favorites.length === 0) {
      return res
        .status(200)
        .json({ message: "No favorites found for this user.", favorites: [] });
    }
    res.status(200).json(favorites);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error." });
  }
}

module.exports = {
  addFavorite,
  getUserFavorites,
  removeFavorite,
};
