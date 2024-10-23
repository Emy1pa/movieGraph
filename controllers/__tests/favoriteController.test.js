const mongoose = require("mongoose");
const {
  addFavorite,
  getUserFavorites,
  removeFavorite,
} = require("../favoriteController");
const { User } = require("../../models/User");
const { Movie } = require("../../models/Movie");
const Favorite = require("../../models/Favorite");

jest.mock("../../models/User");
jest.mock("../../models/Movie");
jest.mock("../../models/Favorite");

describe("Favorite Controller", () => {
  describe("addFavorite", () => {
    it("should add a movie to user's favorites", async () => {
      const req = { body: { user: "userId123", movie: "movieId123" } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      User.findById.mockResolvedValue({ _id: "userId123" }); // Corrected here
      Movie.findById.mockResolvedValue({ _id: "movieId123" });
      Movie.findOne.mockResolvedValue(null);

      await addFavorite(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(expect.any(Object));
    });

    it("should return 404 if user is not found", async () => {
      const req = { body: { user: "invalidUserId", movie: "movieId123" } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      User.findById.mockResolvedValue(null); // Corrected here

      await addFavorite(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        message: "User not found.",
      });
    });

    it("should return 404 if movie is not found", async () => {
      const req = { body: { user: "userId123", movie: "invalidMovieId" } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      User.findById.mockResolvedValue({ _id: "userId123" });
      Movie.findById.mockResolvedValue(null); // Corrected here

      await addFavorite(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        message: "Movie not found.",
      });
    });
    it("should return 400 if movie is already in user's favorites", async () => {
      const req = { body: { user: "userId123", movie: "movieId123" } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      User.findById.mockResolvedValue({ _id: "userId123" });
      Movie.findById.mockResolvedValue({ _id: "movieId123" });
      Favorite.findOne.mockResolvedValue({
        user: "userId123",
        movie: "movieId123",
      });

      await addFavorite(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        message: "Movie is already in favorites.",
      });
    });
  });
  describe("getUserFavorites", () => {
    it("should return a user's favorite movies", async () => {
      const req = { params: { userId: "userId123" } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      Favorite.find.mockResolvedValue([
        {
          movie: "movieId123",
          user: "userId123",
        },
      ]);
      await getUserFavorites(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(expect.any(Array));
    });
    it("should return 404 if user has no favorites", async () => {
      const req = { params: { userId: "userId123" } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      Favorite.find.mockResolvedValue([]);
      await getUserFavorites(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        message: "No favorites found for this user.",
      });
    });
  });
  describe("removeFavorite", () => {
    it("should remove a movie from user's favorites", async () => {
      const req = { body: { user: "userId123", movie: "movieId123" } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      Favorite.findOneAndDelete.mockResolvedValue({
        user: "userId123",
        movie: "movieId123",
      });
      await removeFavorite(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: "Movie has been removed from favorites.",
      });
    });
    it("should return 404 if favoite is not found", async () => {
      const req = { body: { userId: "userId123", movie: "movieId999" } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      Favorite.findOneAndDelete.mockResolvedValue(null);
      await removeFavorite(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: "Favorite not found." });
    });
  });
});
