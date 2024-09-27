const path = require("path");
const fs = require("fs");
const {
  cloudinaryUploadImage,
  cloudinaryRemoveImage,
} = require("../utils/cloudinary");

const {
  Movie,
  validateMovie,
  validateUpdateMovie,
} = require("../models/Movie");

async function createMovie(req, res) {
  try {
    const { error } = validateMovie(req.body);
    if (error)
      return res.status(400).json({ message: error.details[0].message });

    const movie = new Movie(req.body);
    if (req.file) {
      const imagePath = path.join(__dirname, `../images/${req.file.filename}`);
      const result = await cloudinaryUploadImage(imagePath);
      movie.image = {
        url: result.secure_url,
        publicId: result.public_id,
      };
      fs.unlinkSync(imagePath);
    }
    await movie.save();
    res.status(201).json(movie);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
}

async function getMovies(req, res) {
  try {
    const movies = await Movie.find();
    res.status(200).json(movies);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
}

async function getMovieById(req, res) {
  try {
    const movie = await Movie.findById(req.params.id);
    if (movie) {
      res.status(200).json(movie);
    } else {
      res.status(404).json({ message: "Movie not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
}

async function updateMovie(req, res) {
  try {
    const { error } = validateUpdateMovie(req.body);
    if (error)
      return res.status(400).json({ message: error.details[0].message });

    let updateData = { ...req.body };
    if (req.file) {
      const imagePath = path.join(__dirname, `../images/${req.file.filename}`);
      const result = await cloudinaryUploadImage(imagePath);

      updateData.image = {
        url: result.secure_url,
        publicId: result.public_id,
      };
      fs.unlinkSync(imagePath);
      const existingMovie = await Movie.findById(req.params.id);
      if (
        existingMovie &&
        existingMovie.image &&
        existingMovie.image.publicId
      ) {
        await cloudinaryRemoveImage(existingMovie.image.publicId);
      }
    }
    const movie = await Movie.findByIdAndUpdate(
      req.params.id,
      { $set: updateData },
      { new: true }
    );
    if (movie) {
      res.status(200).json(movie);
    } else {
      res.status(404).json({ message: "Movie not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
}

async function deleteMovie(req, res) {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) return res.status(404).json({ message: "Movie not found" });

    if (movie.image.publicId) {
      await cloudinaryRemoveImage(movie.image.publicId);
    }

    await movie.deleteOne();
    res.status(200).json({ message: "Movie has been deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
}

module.exports = {
  createMovie,
  getMovies,
  getMovieById,
  updateMovie,
  deleteMovie,
};
