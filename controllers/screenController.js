const {
  Screen,
  validateScreening,
  validateUpdateScreening,
} = require("../models/Screen.js");

async function createScreening(req, res) {
  try {
    const { error } = validateScreening(req.body);
    if (error)
      return res.status(400).json({ message: error.details[0].message });

    const screening = new Screen(req.body);
    await screening.save();
    res.status(201).json(screening);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
}

async function getScreenings(req, res) {
  try {
    const screenings = await Screen.find().populate("movie").populate("room");
    res.status(200).json(screenings);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
}

async function getScreeningById(req, res) {
  try {
    const screening = await Screen.findById(req.params.id)
      .populate("movie")
      .populate("room");
    if (screening) {
      res.status(200).json(screening);
    } else {
      res.status(404).json({ message: "Screening not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
}

async function updateScreening(req, res) {
  try {
    const { error } = validateUpdateScreening(req.body);
    if (error)
      return res.status(400).json({ message: error.details[0].message });

    const screening = await Screen.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    )
      .populate("movie")
      .populate("room");
    if (screening) {
      res.status(200).json(screening);
    } else {
      res.status(404).json({ message: "Screening not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
}

async function deleteScreening(req, res) {
  try {
    const screening = await Screen.findByIdAndDelete(req.params.id);
    if (screening) {
      res
        .status(200)
        .json({ message: "Screening has been deleted successfully" });
    } else {
      res.status(404).json({ message: "Screening not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
}

async function getAvailableScreenings(req, res) {
  try {
    const { movieId } = req.params;
    const screenings = await Screen.find({
      movie: movieId,
      dateTime: { $gte: new Date() },
    })
      .populate("movie")
      .populate("room")
      .sort("dateTime");
    res.status(200).json(screenings);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
}

module.exports = {
  createScreening,
  getScreenings,
  getScreeningById,
  updateScreening,
  deleteScreening,
  getAvailableScreenings,
};
