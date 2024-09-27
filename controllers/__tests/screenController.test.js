const {
  validateScreening,
  validateUpdateScreening,
} = require("../../models/Screen");
const mongoose = require("mongoose");
const Screening = require("../../models/Screen");

describe("Screening Validation", () => {
  it("should validate a valid screening", () => {
    const validScreening = {
      movie: "60d21b4667d0d8992e610c85",
      room: "60d21b4667d0d8992e610c86",
      dateTime: "2024-09-30T14:30:00Z",
      price: 10,
    };
    const { error } = validateScreening(validScreening);
    expect(error).toBeUndefined();
  });

  it("should return an error for missing movie", () => {
    const invalidScreening = {
      room: "60d21b4667d0d8992e610c86",
      dateTime: "2024-09-30T14:30:00Z",
      price: 10,
    };
    const { error } = validateScreening(invalidScreening);
    expect(error).toBeDefined();
    expect(error.details[0].message).toContain("movie");
  });

  it("should return an error for invalid price", () => {
    const invalidScreening = {
      movie: "60d21b4667d0d8992e610c85",
      room: "60d21b4667d0d8992e610c86",
      dateTime: "2024-09-30T14:30:00Z",
      price: -5,
    };
    const { error } = validateScreening(invalidScreening);
    expect(error).toBeDefined();
    expect(error.details[0].message).toContain("price");
  });
});

describe("Screening Update Validation", () => {
  it("should validate a valid screening update", () => {
    const validUpdate = {
      price: 12,
    };
    const { error } = validateUpdateScreening(validUpdate);
    expect(error).toBeUndefined();
  });

  it("should allow optional fields in update", () => {
    const updateWithOptionalFields = {
      room: "60d21b4667d0d8992e610c86",
    };
    const { error } = validateUpdateScreening(updateWithOptionalFields);
    expect(error).toBeUndefined();
  });

  it("should return an error for invalid date format in update", () => {
    const invalidUpdate = {
      dateTime: "invalid-date",
    };
    const { error } = validateUpdateScreening(invalidUpdate);
    expect(error).toBeDefined();
    expect(error.details[0].message).toContain("dateTime");
  });
});
