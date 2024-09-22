import User, {
  validateLoginUser,
  validateRegisterUser,
  validateUpdateUser,
} from "../models/User.mjs";
import bcrypt from "bcryptjs";
export async function register(req, res) {
  try {
    const { error } = validateRegisterUser(req.body);
    if (error)
      return res.status(400).json({ message: error.details[0].message });
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).json({ message: "User already registered" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    user = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: hashedPassword,
    });
    await user.save();
    const token = user.generateAuthToken();
    const { password, ...other } = user._doc;
    res.status(201).json({ ...other, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
}
export async function login(req, res) {
  try {
    const { error } = validateLoginUser(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    const isPasswordMatch = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    const token = user.generateAuthToken();
    const { password, ...other } = user._doc;
    res.status(200).json({ ...other, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
}
export async function updateUser(req, res) {
  try {
    const { error } = validateUpdateUser(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
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
    res.status(200).json(updatedUser);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
}

export async function getUsers(req, res) {
  try {
    const users = await User.find().select("-password");
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
}

export async function GetUserById(req, res) {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
}

export async function DeleteUser(req, res) {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (user) {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: "User has been deleted successfully" });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
}

export async function logOut(req, res) {
  try {
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
}
