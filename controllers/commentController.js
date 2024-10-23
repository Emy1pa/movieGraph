const { User } = require("../models/User");
const { Movie } = require("../models/Movie");
const {
  Comment,
  validateComment,
  validateUpdateComment,
} = require("../models/Comment");

async function createComment(req, res) {
  try {
    console.log("Request body:", req.body);

    // const { error } = validateComment(req.body);
    // if (error)
    //   return res.status(400).json({ message: error.details[0].message });

    const { user, movie, content } = req.body;

    const existingUser = await User.findById(user);
    if (!existingUser)
      return res.status(404).json({ message: "User not found." });

    const existingMovie = await Movie.findById(movie);
    if (!existingMovie)
      return res.status(404).json({ message: "Movie not found." });

    const comment = new Comment({
      user,
      movie,
      content,
    });
    await comment.save();

    res.status(201).json(comment);
  } catch (error) {
    console.error("Error creating comment:", error);
    res.status(500).json({ message: "Something went wrong." });
  }
}

async function getComments(req, res) {
  try {
    const comments = await Comment.find();

    if (!comments || comments.length === 0) {
      return res.status(404).json({ message: "No comments found." });
    }

    res.status(200).json(comments);
  } catch (error) {
    console.error("Error fetching comments:", error);
    res.status(500).json({ message: "Something went wrong." });
  }
}

async function getCommentById(req, res) {
  try {
    const comment = await Comment.findById(req.params.id);

    if (!comment) {
      return res.status(404).json({ message: "Comment not found." });
    }

    res.status(200).json(comment);
  } catch (error) {
    console.error("Error fetching comment:", error);
    res.status(500).json({ message: "Something went wrong." });
  }
}

async function updateComment(req, res) {
  try {
    console.log("Request body for update:", req.body);

    const { error } = validateUpdateComment(req.body);
    if (error)
      return res.status(400).json({ message: error.details[0].message });

    const { content } = req.body;

    const comment = await Comment.findByIdAndUpdate(
      req.params.id,
      { content },
      { new: true }
    )
      .populate("user", "-password")
      .populate("movie");

    if (!comment) {
      return res.status(404).json({ message: "Comment not found." });
    }

    res.status(200).json(comment);
  } catch (error) {
    console.error("Error updating comment:", error);
    res.status(500).json({ message: "Something went wrong." });
  }
}

async function deleteComment(req, res) {
  try {
    const comment = await Comment.findByIdAndDelete(req.params.id);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found." });
    }

    res.status(200).json({ message: "Comment has been deleted successfully." });
  } catch (error) {
    console.error("Error deleting comment:", error);
    res.status(500).json({ message: "Something went wrong." });
  }
}

async function getUserComments(req, res) {
  try {
    const userId = req.params.userId;

    const comments = await Comment.find({ user: userId })
      .populate("user", "-password")
      .populate("movie");

    if (!comments || comments.length === 0) {
      return res
        .status(404)
        .json({ message: "No comments found for this user." });
    }

    res.status(200).json(comments);
  } catch (error) {
    console.error("Error fetching user comments:", error);
    res.status(500).json({ message: "Something went wrong." });
  }
}

module.exports = {
  createComment,
  getComments,
  getCommentById,
  updateComment,
  deleteComment,
  getUserComments,
};
