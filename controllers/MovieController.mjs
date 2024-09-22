import Movie, { validateMovie, validateUpdateMovie } from "../models/Movie.mjs";

export async function createMovie(req, res) {
  try {
    const { error } = validateMovie(req.body);
    if (error)
      return res.status(400).json({ message: error.details[0].message });

    const movie = new Movie(req.body);
    await movie.save();
    res.status(201).json(movie);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
}

export async function getMovies(req, res) {
  try {
    const movies = await Movie.find();
    res.status(200).json(movies);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
}

export async function getMovieById(req, res) {
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

export async function updateMovie(req, res) {
  try {
    const { error } = validateUpdateMovie(req.body);
    if (error)
      return res.status(400).json({ message: error.details[0].message });

    const movie = await Movie.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
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

export async function deleteMovie(req, res) {
  try {
    const movie = await Movie.findByIdAndDelete(req.params.id);
    if (movie) {
      res.status(200).json({ message: "Movie has been deleted successfully" });
    } else {
      res.status(404).json({ message: "Movie not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
}
