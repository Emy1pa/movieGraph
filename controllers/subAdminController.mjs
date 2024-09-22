import User, {
  validateRegisterUser,
  validateUpdateUser,
} from "../models/User.mjs";
import bcrypt from "bcryptjs";

export async function createSubAdmin(req, res) {
  try {
    if (req.user.role != "admin") {
      return res.status(403).json({ message: "Access denied" });
    }
    const { error } = validateRegisterUser(req.body);
    if (error)
      return res.status(400).json({ message: error.details[0].message });
    let user = await User.findOne({ email: req.body.email });
    if (user)
      return res.status(400).json({ message: "User already registered" });
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    user = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: hashedPassword,
      role: "subadmin",
    });
    await user.save();
    res.status(201).json({ message: "Subadmin created successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
}
export async function updateSubAdmin(req, res) {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }
    const { error } = validateUpdateUser(req.body);
    if (error)
      return res.status(400).json({ message: error.details[0].message });
    const user = await User.findById(req.params.id);

    if (!user || user.role !== "subadmin") {
      return res.status(404).json({ message: "Subadmin not found" });
    }
    let updatedFields = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
    };
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      updatedFields.password = await bcrypt.hash(req.body.password, salt);
    }
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: updatedFields },
      { new: true }
    ).select("-password");
    res
      .status(200)
      .json({ message: "Subadmin updated successfully", updatedUser });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
}
export async function deleteSubadmin(req, res) {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }
    const user = await User.findById(req.params.id);
    if (!user || user.role !== "subadmin") {
      return res.status(404).json({ message: "Subadmin not found" });
    }
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Subadmin deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
}
