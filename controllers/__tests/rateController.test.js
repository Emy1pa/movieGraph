const {
  createRate,
  getRates,
  getRateById,
  deleteRate,
} = require("../rateController");
const { User } = require("../../models/User");
const { Movie } = require("../../models/Movie");
const { Rate } = require("../../models/Rate");

jest.mock("../../models/User");
jest.mock("../../models/Movie");
jest.mock("../../models/Rate");

describe("Rate Controller", () => {
  describe("createRate", () => {
    it("should create a new rating", async () => {
      const req = {
        body: { user: "userId123", movie: "movieId123", ratingValue: 5 },
      };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      User.findById.mockResolvedValue({ _id: "userId123" });
      Movie.findById.mockResolvedValue({ _id: "movieId123" });
      Rate.findOne.mockResolvedValue(null);

      await createRate(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(expect.any(Object));
    });

    it("should return 404 if user is not found", async () => {
      const req = {
        body: { user: "invalidUserId", movie: "movieId123", ratingValue: 5 },
      };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      User.findById.mockResolvedValue(null);

      await createRate(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: "User not found." });
    });

    it("should return 404 if movie is not found", async () => {
      const req = {
        body: { user: "userId123", movie: "invalidMovieId", ratingValue: 5 },
      };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      User.findById.mockResolvedValue({ _id: "userId123" });
      Movie.findById.mockResolvedValue(null);

      await createRate(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: "Movie not found." });
    });
  });

  describe("getRates", () => {
    it("should return all rates", async () => {
      const req = {};
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      Rate.find.mockResolvedValue([
        { user: "userId123", movie: "movieId123", ratingValue: 5 },
      ]);
      await getRates(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(expect.any(Array));
    });

    it("should return 404 if no rates are found", async () => {
      const req = {};
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      Rate.find.mockResolvedValue([]);
      await getRates(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: "No rates found." });
    });
  });

  describe("getRateById", () => {
    it("should return a rate by ID", async () => {
      const req = { params: { id: "rateId123" } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      Rate.findById.mockResolvedValue({
        user: "userId123",
        movie: "movieId123",
        ratingValue: 5,
      });
      await getRateById(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(expect.any(Object));
    });

    it("should return 404 if rate is not found", async () => {
      const req = { params: { id: "invalidRateId" } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      Rate.findById.mockResolvedValue(null);
      await getRateById(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: "Rate not found." });
    });
  });

  describe("deleteRate", () => {
    it("should delete a rate", async () => {
      const req = { params: { id: "rateId123" } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      Rate.findByIdAndDelete.mockResolvedValue({
        user: "userId123",
        movie: "movieId123",
        ratingValue: 5,
      });
      await deleteRate(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: "Rate has been deleted successfully.",
      });
    });

    it("should return 404 if rate is not found", async () => {
      const req = { params: { id: "invalidRateId" } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      Rate.findByIdAndDelete.mockResolvedValue(null);
      await deleteRate(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: "Rate not found." });
    });
  });
});
