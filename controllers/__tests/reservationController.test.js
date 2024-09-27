const {
  validateReservation,
  validateUpdateReservation,
} = require("../../models/Reservation");

describe("Reservation Validation", () => {
  it("should validate a valid reservation", () => {
    const validReservation = {
      user: "validUserId",
      screening: "validScreeningId",
      room: "validRoomId",
      seats: [
        { row: 1, column: 1 },
        { row: 1, column: 2 },
      ],
      totalPrice: 20,
    };
    const { error } = validateReservation(validReservation);
    expect(error).toBeUndefined();
  });

  it("should return an error for missing user", () => {
    const invalidReservation = {
      screening: "validScreeningId",
      room: "validRoomId",
      seats: [{ row: 1, column: 1 }],
      totalPrice: 10,
    };
    const { error } = validateReservation(invalidReservation);
    expect(error).toBeDefined();
    expect(error.details[0].message).toContain("user");
  });

  it("should return an error for invalid totalPrice", () => {
    const invalidReservation = {
      user: "validUserId",
      screening: "validScreeningId",
      room: "validRoomId",
      seats: [{ row: 1, column: 1 }],
      totalPrice: -5,
    };
    const { error } = validateReservation(invalidReservation);
    expect(error).toBeDefined();
    expect(error.details[0].message).toContain("totalPrice");
  });

  it("should validate a valid reservation update", () => {
    const validUpdate = {
      seats: [{ row: 1, column: 3 }],
      totalPrice: 15,
    };
    const { error } = validateUpdateReservation(validUpdate);
    expect(error).toBeUndefined();
  });

  it("should return an error for invalid seats in update", () => {
    const invalidUpdate = {
      seats: [],
    };
    const { error } = validateUpdateReservation(invalidUpdate);
    expect(error).toBeDefined();
    expect(error.details[0].message).toContain("seats");
  });
});
