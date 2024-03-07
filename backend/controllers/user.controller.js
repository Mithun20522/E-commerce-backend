import User from "../models/user.model.js";

export const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res
            .status(400)
            .send("All fields are mandatory");
    }
    const newUser = {
      username,
      email,
      password,
    };

    const isExist = User.find(newUser);

    if (isExist) {
      return res
            .status(400)
            .send("User already exist");
    } else {
      await User.createCollection(newUser);
      return res
            .status(201)
            .send({ message: "Registration Successfull" }, newUser);
    }
  } catch (error) {
    return res
            .status(500)
            .send("Internal server error");
  }
};
