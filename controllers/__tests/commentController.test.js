const {
  createComment,
  getComments,
  getCommentById,
  updateComment,
  deleteComment,
} = require("../commentController");
const { User } = require("../../models/User");
const { Movie } = require("../../models/Movie");
const { Comment } = require("../../models/Comment");

jest.mock("../../models/User");
jest.mock("../../models/Movie");
jest.mock("../../models/Comment");

describe("Comment Controller", () => {
  describe("createComment", () => {
    it("should create a new comment", async () => {
      const req = {
        body: {
          user: "userId123",
          movie: "movieId123",
          content: "Great movie!",
        },
      };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      User.findById.mockResolvedValue({ _id: "userId123" });
      Movie.findById.mockResolvedValue({ _id: "movieId123" });
      Comment.findOne.mockResolvedValue(null);

      await createComment(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(expect.any(Object));
    });

    it("should return 404 if user is not found", async () => {
      const req = {
        body: {
          user: "invalidUserId",
          movie: "movieId123",
          content: "Great movie!",
        },
      };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      User.findById.mockResolvedValue(null);

      await createComment(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: "User not found." });
    });

    it("should return 404 if movie is not found", async () => {
      const req = {
        body: {
          user: "userId123",
          movie: "invalidMovieId",
          content: "Great movie!",
        },
      };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      User.findById.mockResolvedValue({ _id: "userId123" });
      Movie.findById.mockResolvedValue(null);

      await createComment(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: "Movie not found." });
    });
  });

  describe("getComments", () => {
    it("should return all comments", async () => {
      const req = {};
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      Comment.find.mockResolvedValue([
        { user: "userId123", movie: "movieId123", content: "Great movie!" },
      ]);
      await getComments(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(expect.any(Array));
    });

    it("should return 404 if no comments are found", async () => {
      const req = {};
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      Comment.find.mockResolvedValue([]);
      await getComments(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: "No comments found." });
    });
  });

  describe("getCommentById", () => {
    it("should return a comment by ID", async () => {
      const req = { params: { id: "commentId123" } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      Comment.findById.mockResolvedValue({
        user: "userId123",
        movie: "movieId123",
        content: "Great movie!",
      });
      await getCommentById(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(expect.any(Object));
    });

    it("should return 404 if comment is not found", async () => {
      const req = { params: { id: "invalidCommentId" } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      Comment.findById.mockResolvedValue(null);
      await getCommentById(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: "Comment not found." });
    });
  });

  describe("deleteComment", () => {
    it("should delete a comment", async () => {
      const req = { params: { id: "commentId123" } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      Comment.findByIdAndDelete.mockResolvedValue({
        user: "userId123",
        movie: "movieId123",
        content: "Great movie!",
      });
      await deleteComment(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: "Comment has been deleted successfully.",
      });
    });

    it("should return 404 if comment is not found", async () => {
      const req = { params: { id: "invalidCommentId" } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      Comment.findByIdAndDelete.mockResolvedValue(null);
      await deleteComment(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: "Comment not found." });
    });
  });
});
