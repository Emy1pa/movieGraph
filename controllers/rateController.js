const { User } = require("../models/User");
const { Movie } = require("../models/Movie");
const dotenv = require("dotenv");
const { Rate, validateRating, validateUpdateRate } = require("../models/Rate");
dotenv.config();
async function createRate(req, res) {
  try {
    console.log("Request body:", req.body);

    // const { error } = validateRating(req.body);
    // if (error)
    //   return res.status(400).json({ message: error.details[0].message });

    const { user, movie, ratingValue } = req.body;

    const existingUser = await User.findById(user);
    if (!existingUser) {
      return res.status(404).json({ message: "User not found." });
    }

    const existingMovie = await Movie.findById(movie);
    if (!existingMovie) {
      return res.status(404).json({ message: "Movie not found." });
    }

    const existingRate = await Rate.findOne({ user, movie });
    if (existingRate) {
      return res
        .status(400)
        .json({ message: "You have already rated this movie." });
    }

    const rate = new Rate({ user, movie, ratingValue });
    await rate.save();

    res.status(201).json(rate);
  } catch (error) {
    console.error("Error creating rate:", error);
    res.status(500).json({ message: "Something went wrong." });
  }
}

async function getRates(req, res) {
  try {
    const rates = await Rate.find();

    if (!rates || rates.length === 0) {
      return res.status(404).json({ message: "No rates found." });
    }

    res.status(200).json(rates);
  } catch (error) {
    console.error("Error fetching rates:", error);
    res.status(500).json({ message: "Something went wrong." });
  }
}

async function getRateById(req, res) {
  try {
    const rate = await Rate.findById(req.params.id);

    if (!rate) {
      return res.status(404).json({ message: "Rate not found." });
    }

    res.status(200).json(rate);
  } catch (error) {
    console.error("Error fetching rate:", error);
    res.status(500).json({ message: "Something went wrong." });
  }
}

async function updateRate(req, res) {
  try {
    const { error } = validateUpdateRate(req.body);
    if (error)
      return res.status(400).json({ message: error.details[0].message });

    const { ratingValue } = req.body;

    const rate = await Rate.findByIdAndUpdate(
      req.params.id,
      { ratingValue },
      { new: true }
    )
      .populate("user", "-password")
      .populate("movie");

    if (!rate) {
      return res.status(404).json({ message: "Rate not found." });
    }

    res.status(200).json(rate);
  } catch (error) {
    console.error("Error updating rate:", error);
    res.status(500).json({ message: "Something went wrong." });
  }
}

async function deleteRate(req, res) {
  try {
    const rate = await Rate.findByIdAndDelete(req.params.id);
    if (!rate) {
      return res.status(404).json({ message: "Rate not found." });
    }

    res.status(200).json({ message: "Rate has been deleted successfully." });
  } catch (error) {
    console.error("Error deleting rate:", error);
    res.status(500).json({ message: "Something went wrong." });
  }
}

async function getUserRates(req, res) {
  try {
    const rates = await Rate.find({ user: req.params.userId });
    if (rates.length === 0) {
      return res.status(404).json({ message: "No rates found for this user." });
    }
    res.status(200).json(rates);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error." });
  }
}

module.exports = {
  createRate,
  getRates,
  getRateById,
  updateRate,
  deleteRate,
  getUserRates,
};
