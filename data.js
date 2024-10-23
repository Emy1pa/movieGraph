const movies = [
  {
    title: "Inception",
    duration: 148,
    genre: "Sci-Fi",
    description:
      "A thief who steals corporate secrets through dream-sharing technology is given the task of planting an idea into a CEO's mind.",
    published_at: new Date("2010-07-16"),
    image: {
      url: "https://res.cloudinary.com/dv13g84vz/image/upload/v1729108905/s57zlt5gzs3zcdnirvyg.jpg",
      publicId: "s57zlt5gzs3zcdnirvyg",
    },
    video: {
      url: null,
      format: null,
    },
    visibility: "public",
  },
  {
    title: "The Dark Knight",
    duration: 152,
    genre: "Action",
    description:
      "When the menace known as the Joker emerges from his mysterious past, he wreaks havoc and chaos on the people of Gotham.",
    published_at: new Date("2008-07-18"),
    image: {
      url: "https://res.cloudinary.com/dv13g84vz/image/upload/v1729108905/s57zlt5gzs3zcdnirvyg.jpg",
      publicId: "s57zlt5gzs3zcdnirvyg",
    },
    video: {
      url: null,
      format: null,
    },
    visibility: "public",
  },
  {
    title: "Interstellar",
    duration: 169,
    genre: "Adventure",
    description:
      "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
    published_at: new Date("2014-11-07"),
    image: {
      url: "https://res.cloudinary.com/dv13g84vz/image/upload/v1729108905/s57zlt5gzs3zcdnirvyg.jpg",
      publicId: "s57zlt5gzs3zcdnirvyg",
    },
    video: {
      url: null,
      format: null,
    },
    visibility: "public",
  },
  {
    title: "Parasite",
    duration: 132,
    genre: "Thriller",
    description:
      "Greedy, unemployed Ki-taek and his family scheme to become employed by a wealthy family and infiltrate their household.",
    published_at: new Date("2019-05-30"),
    image: {
      url: "https://res.cloudinary.com/dv13g84vz/image/upload/v1729108905/s57zlt5gzs3zcdnirvyg.jpg",
      publicId: "s57zlt5gzs3zcdnirvyg",
    },
    video: {
      url: null,
      format: null,
    },
    visibility: "public",
  },
  {
    title: "The Shawshank Redemption",
    duration: 142,
    genre: "Drama",
    description:
      "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
    published_at: new Date("1994-09-23"),
    image: {
      url: "https://res.cloudinary.com/dv13g84vz/image/upload/v1729108905/s57zlt5gzs3zcdnirvyg.jpg",
      publicId: "s57zlt5gzs3zcdnirvyg",
    },
    video: {
      url: null,
      format: null,
    },
    visibility: "public",
  },
  {
    title: "Forrest Gump",
    duration: 142,
    genre: "Drama",
    description:
      "The presidencies of Kennedy and Johnson, the Vietnam War, the Watergate scandal and other historical events unfold through the perspective of an Alabama man.",
    published_at: new Date("1994-07-06"),
    image: {
      url: "https://res.cloudinary.com/dv13g84vz/image/upload/v1729108905/s57zlt5gzs3zcdnirvyg.jpg",
      publicId: "s57zlt5gzs3zcdnirvyg",
    },
    video: {
      url: null,
      format: null,
    },
    visibility: "public",
  },
  {
    title: "Fight Club",
    duration: 139,
    genre: "Drama",
    description:
      "An insomniac office worker and a devil-may-care soap maker form an underground fight club that evolves into an anarchic revolution.",
    published_at: new Date("1999-10-15"),
    image: {
      url: "https://res.cloudinary.com/dv13g84vz/image/upload/v1729108905/s57zlt5gzs3zcdnirvyg.jpg",
      publicId: "s57zlt5gzs3zcdnirvyg",
    },
    video: {
      url: null,
      format: null,
    },
    visibility: "public",
  },
  {
    title: "The Godfather",
    duration: 175,
    genre: "Crime",
    description:
      "An organized crime dynasty's aging patriarch transfers control of his clandestine empire to his reluctant son.",
    published_at: new Date("1972-03-24"),
    image: {
      url: "https://res.cloudinary.com/dv13g84vz/image/upload/v1729108905/s57zlt5gzs3zcdnirvyg.jpg",
      publicId: "s57zlt5gzs3zcdnirvyg",
    },
    video: {
      url: null,
      format: null,
    },
    visibility: "public",
  },
  {
    title: "Pulp Fiction",
    duration: 154,
    genre: "Crime",
    description:
      "The lives of two mob hitmen, a boxer, a gangster's wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
    published_at: new Date("1994-10-14"),
    image: {
      url: "https://res.cloudinary.com/dv13g84vz/image/upload/v1729108905/s57zlt5gzs3zcdnirvyg.jpg",
      publicId: "s57zlt5gzs3zcdnirvyg",
    },
    video: {
      url: null,
      format: null,
    },
    visibility: "public",
  },
  {
    title: "The Lord of the Rings: The Return of the King",
    duration: 201,
    genre: "Fantasy",
    description:
      "Gandalf and Aragorn lead the World of Men against Sauron's army to draw his gaze from Frodo and Sam as they approach Mount Doom with the One Ring.",
    published_at: new Date("2003-12-17"),
    image: {
      url: "https://res.cloudinary.com/dv13g84vz/image/upload/v1729108905/s57zlt5gzs3zcdnirvyg.jpg",
      publicId: "s57zlt5gzs3zcdnirvyg",
    },
    video: {
      url: null,
      format: null,
    },
    visibility: "public",
  },
  {
    title: "The Matrix",
    duration: 136,
    genre: "Sci-Fi",
    description:
      "A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.",
    published_at: new Date("1999-03-31"),
    image: {
      url: "https://res.cloudinary.com/dv13g84vz/image/upload/v1729108905/s57zlt5gzs3zcdnirvyg.jpg",
      publicId: "s57zlt5gzs3zcdnirvyg",
    },
    video: {
      url: null,
      format: null,
    },
    visibility: "public",
  },
  {
    title: "Gladiator",
    duration: 155,
    genre: "Action",
    description:
      "A former Roman general sets out to exact vengeance against the corrupt emperor who murdered his family and sent him into slavery.",
    published_at: new Date("2000-05-05"),
    image: {
      url: "https://res.cloudinary.com/dv13g84vz/image/upload/v1729108905/s57zlt5gzs3zcdnirvyg.jpg",
      publicId: "s57zlt5gzs3zcdnirvyg",
    },
    video: {
      url: null,
      format: null,
    },
    visibility: "public",
  },
  {
    title: "Titanic",
    duration: 195,
    genre: "Romance",
    description:
      "A seventeen-year-old aristocrat falls in love with a kind but poor artist aboard the luxurious, ill-fated R.M.S. Titanic.",
    published_at: new Date("1997-12-19"),
    image: {
      url: "https://res.cloudinary.com/dv13g84vz/image/upload/v1729108905/s57zlt5gzs3zcdnirvyg.jpg",
      publicId: "s57zlt5gzs3zcdnirvyg",
    },
    video: {
      url: null,
      format: null,
    },
    visibility: "public",
  },
  {
    title: "The Social Network",
    duration: 120,
    genre: "Biography",
    description:
      "As Harvard students create the social networking site that would become known as Facebook, they must deal with fallout from friends and foes.",
    published_at: new Date("2010-10-01"),
    image: {
      url: "https://res.cloudinary.com/dv13g84vz/image/upload/v1729108905/s57zlt5gzs3zcdnirvyg.jpg",
      publicId: "s57zlt5gzs3zcdnirvyg",
    },
    video: {
      url: null,
      format: null,
    },
    visibility: "public",
  },
];

module.exports = { movies };
