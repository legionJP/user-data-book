import User from "../models/userModels.js";
import generateToken from "../utils/token.js";

//@route POST /api/user
//@desc auth user
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    if (name === "" || email === "" || password === "") {
      throw new Error("Please Fill All the details");
    }

    const userExist = await User.findOne({ email });
    if (userExist) {
      throw new Error(" This User already exist");
    }

    const user = await User.create({ name, email, password, tableName: [] });
    if (user) {
      res
        .status(201)
        .json({ token: generateToken(user._id, user.name, user.email, user.tableName) });
    } else {
      throw new Error(" Opps! Invalid User data");
    }
  } catch (error) {
    res.status(400).json({ error: error.toString() });
  }
};

//@route POST /api/user/login
//@desc auth user
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (email === "" || password === "") {
      throw new Error(" Please Fill All details");
    }
    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
      res
        .status(201)
        .json({ token: generateToken(user._id, user.name, user.email, user.tableName) });
    } else {
      throw new Error("you have entered wrong email password");
    }
  } catch (error) {
    res.status(401).json({ error: error.toString() });
  }
};

export { registerUser, loginUser };
