const { validateRoom, validateUpdateRoom } = require("../../models/Room");

describe("Room Validation", () => {
  it("should validate a valid room", () => {
    const validRoom = {
      name: "Main Hall",
      capacity: 100,
      type: "ScreenType",
      screenSize: 50,
      numberOfPlaces: 100,
      rowsCount: 10,
      seatsPerRow: 10,
    };
    const { error } = validateRoom(validRoom);
    expect(error).toBeUndefined();
  });

  it("should return an error for missing name", () => {
    const invalidRoom = {
      capacity: 100,
      type: "ScreenType",
      screenSize: 50,
      numberOfPlaces: 100,
      rowsCount: 10,
      seatsPerRow: 10,
    };
    const { error } = validateRoom(invalidRoom);
    expect(error).toBeDefined();
    expect(error.details[0].message).toContain("name");
  });

  it("should return an error for invalid capacity", () => {
    const invalidRoom = {
      name: "Main Hall",
      capacity: -50,
      type: "ScreenType",
      screenSize: 50,
      numberOfPlaces: 100,
      rowsCount: 10,
      seatsPerRow: 10,
    };
    const { error } = validateRoom(invalidRoom);
    expect(error).toBeDefined();
    expect(error.details[0].message).toContain("capacity");
  });

  it("should validate a valid room update", () => {
    const validUpdate = {
      name: "New Main Hall",
      capacity: 120,
    };
    const { error } = validateUpdateRoom(validUpdate);
    expect(error).toBeUndefined();
  });

  it("should return an error for invalid screen size in update", () => {
    const invalidUpdate = {
      screenSize: 15,
    };
    const { error } = validateUpdateRoom(invalidUpdate);
    expect(error).toBeDefined();
    expect(error.details[0].message).toContain("screenSize");
  });
});
