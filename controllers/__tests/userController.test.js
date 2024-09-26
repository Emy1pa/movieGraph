const { validateRegisterUser } = require("../../models/User");
const bcrypt = require("bcryptjs");
const { validateLoginUser } = require("../../models/User");
describe("User Registration Validation", () => {
  it("should validate a valid user registration", () => {
    const validUser = {
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      password: "StrongPass123!",
      phoneNumber: "1234567890",
      address: "123 Main St",
    };
    const { error } = validateRegisterUser(validUser);
    expect(error).toBeUndefined();
  });

  it("should return an error for missing email", () => {
    const invalidUser = {
      firstName: "John",
      lastName: "Doe",
      password: "StrongPass123!",
    };
    const { error } = validateRegisterUser(invalidUser);
    expect(error).toBeDefined();
    expect(error.details[0].message).toContain("email");
  });
});

describe("Password Hashing", () => {
  it("should hash the password correctly", async () => {
    const password = "MyPassword123!";
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const isMatch = await bcrypt.compare(password, hashedPassword);
    expect(isMatch).toBe(true);
  });
});

describe("User Login Validation", () => {
  it("should validate a valid user login", () => {
    const validLogin = {
      email: "john.doe@example.com",
      password: "StrongPass123!",
    };
    const { error } = validateLoginUser(validLogin);
    expect(error).toBeUndefined();
  });

  it("should return an error for invalid email format", () => {
    const invalidLogin = {
      email: "invalid-email",
      password: "StrongPass123!",
    };
    const { error } = validateLoginUser(invalidLogin);
    expect(error).toBeDefined();
    expect(error.details[0].message).toContain("email");
  });
});
