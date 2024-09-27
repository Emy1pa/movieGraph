const { validateMovie, validateUpdateMovie } = require("../../models/Movie");

describe("Movie Validation", () => {
  it("should validate a valid movie", () => {
    const validMovie = {
      title: "Inception",
      duration: 148,
      genre: "Sci-Fi",
      description:
        "A thief who steals corporate secrets through the use of dream-sharing technology.",
    };
    const { error } = validateMovie(validMovie);
    expect(error).toBeUndefined();
  });

  it("should return an error for missing title", () => {
    const invalidMovie = {
      duration: 148,
      genre: "Sci-Fi",
      description:
        "A thief who steals corporate secrets through the use of dream-sharing technology.",
    };
    const { error } = validateMovie(invalidMovie);
    expect(error).toBeDefined();
    expect(error.details[0].message).toContain("title");
  });

  it("should return an error for invalid duration", () => {
    const invalidMovie = {
      title: "Inception",
      duration: -10,
      genre: "Sci-Fi",
      description:
        "A thief who steals corporate secrets through the use of dream-sharing technology.",
    };
    const { error } = validateMovie(invalidMovie);
    expect(error).toBeDefined();
    expect(error.details[0].message).toContain("duration");
  });

  it("should validate a valid movie update", () => {
    const validUpdate = {
      title: "Inception 2",
      duration: 150,
    };
    const { error } = validateUpdateMovie(validUpdate);
    expect(error).toBeUndefined();
  });

  it("should return an error for invalid genre in update", () => {
    const invalidUpdate = {
      genre: "",
    };
    const { error } = validateUpdateMovie(invalidUpdate);
    expect(error).toBeDefined();
    expect(error.details[0].message).toContain("genre");
  });
});
