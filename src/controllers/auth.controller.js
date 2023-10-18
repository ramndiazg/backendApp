import User from "../models/User";
import jwt from "jsonwebtoken";
import config from "../config"

export const signup = async (req, res) => {
  const { name, lastName, username, password, mail, roles, phone, imgUrl } =
    req.body;
  const encryptedPassword = await User.encryptPassword(password);
  const newUser = new User({
    name,
    lastName,
    username,
    password: encryptedPassword,
    mail,
    roles,
    phone,
    imgUrl,
  });
  const savedUser = await newUser.save();
  const token = jwt.sign({id: savedUser._id}, config.SECRET, {expiresIn: 86400});
  res.json({token});
};

export const signin = async (req, res) => {
  res.status(200).json("signin");
};
