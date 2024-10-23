const { User } = require("../models/User");
const { Movie } = require("../models/Movie");
const { Favorite } = require("../models/Favorite");
const { Comment } = require("../models/Comment");
const { Rate } = require("../models/Rate");
const { Reservation } = require("../models/Reservation");
const { Room } = require("../models/Room");
const { Screen } = require("../models/Screen");

async function getDashboardStats(req, res) {
  try {
    const [
      totalUsers,
      totalMovies,
      totalComments,
      totalReservations,
      rates,
      totalFavorites,
      totalScreens,
      totalRooms,
    ] = await Promise.all([
      User.countDocuments(),
      Movie.countDocuments(),
      Comment.countDocuments(),
      Reservation.countDocuments(),
      Rate.find(),
      Favorite.countDocuments(),
      Screen.countDocuments(),
      Room.countDocuments(),
    ]);

    const averageRating =
      rates.length > 0
        ? (
            rates.reduce((acc, rate) => acc + rate.ratingValue, 0) /
            rates.length
          ).toFixed(1)
        : 0;

    const statistics = {
      clients: {
        value: totalUsers,
      },
      movies: {
        value: totalMovies,
      },
      comments: {
        value: totalComments,
      },
      reservations: {
        value: totalReservations,
      },
      averageRating: {
        value: averageRating,
      },
      favorites: {
        value: totalFavorites,
      },
      screens: {
        value: totalScreens,
      },
      rooms: {
        value: totalRooms,
      },
    };

    res.status(200).json(statistics);
  } catch (error) {
    console.error("Error fetching dashboard statistics:", error);
    res.status(500).json({
      message: "Error fetching dashboard statistics",
      error: error.message,
    });
  }
}

module.exports = {
  getDashboardStats,
};
