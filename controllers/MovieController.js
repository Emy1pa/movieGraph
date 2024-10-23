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
const { uploadVideoToMinio, deleteVideoFromMinio } = require("../utils/minio");

const createMovie = async (req, res) => {
  try {
    const { error } = validateMovie(req.body);
    if (error)
      return res.status(400).json({ message: error.details[0].message });

    // Parse string fields from FormData
    const movieData = {
      title: req.body.title,
      duration: req.body.duration,
      genre: req.body.genre,
      description: req.body.description,
      published_at: req.body.published_at,
      visibility: req.body.visibility,
    };

    const movie = new Movie(movieData);

    // Handle image upload
    if (req.files && req.files.image) {
      const imagePath = path.join(
        __dirname,
        `../images/${req.files.image[0].filename}`
      );
      const result = await cloudinaryUploadImage(imagePath);
      movie.image = {
        url: result.secure_url,
        publicId: result.public_id,
      };
      // Clean up temporary file
      fs.unlinkSync(imagePath);
    }

    // Handle video upload
    if (req.files && req.files.video) {
      const videoPath = path.join(
        __dirname,
        `../uploads/${req.files.video[0].filename}`
      );
      const videoResult = await uploadVideoToMinio(
        videoPath,
        req.files.video[0].originalname
      );
      movie.video = {
        url: videoResult.url,
        objectName: videoResult.objectName,
        format: "mp4",
      };
      fs.unlinkSync(videoPath);
    }

    await movie.save();
    res.status(201).json(movie);
  } catch (error) {
    console.error("Movie creation error:", error);
    res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
};

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

    // Récupération du film avant toute mise à jour
    const existingMovie = await Movie.findById(req.params.id);
    if (!existingMovie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    // Gestion de l'image
    if (req.file) {
      const imagePath = path.join(__dirname, `../images/${req.file.filename}`);
      const result = await cloudinaryUploadImage(imagePath);

      updateData.image = {
        url: result.secure_url,
        publicId: result.public_id,
      };
      fs.unlinkSync(imagePath);

      // Suppression de l'ancienne image sur Cloudinary
      if (existingMovie.image && existingMovie.image.publicId) {
        await cloudinaryRemoveImage(existingMovie.image.publicId);
      }
    }

    // Gestion de la vidéo
    if (req.files && req.files.video) {
      const videoPath = path.join(
        __dirname,
        `../uploads/${req.files.video[0].filename}`
      );

      // Suppression de l'ancienne vidéo sur Minio
      if (existingMovie.video && existingMovie.video.objectName) {
        await deleteVideoFromMinio(existingMovie.video.objectName);
      }

      const videoResult = await uploadVideoToMinio(
        videoPath,
        req.files.video[0].originalname
      );
      updateData.video = {
        url: videoResult.url,
        objectName: videoResult.objectName,
        format: "mp4",
      };
      fs.unlinkSync(videoPath);
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
    if (movie.video && movie.video.objectName) {
      await deleteVideoFromMinio(movie.video.objectName);
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
