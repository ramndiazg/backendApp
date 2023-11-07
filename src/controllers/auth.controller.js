import User from "../models/User";
import jwt from "jsonwebtoken";
import config from "../config"
import Role from "../models/Role";

export const signup = async (req, res) => {
  const { name, lastName, username, password, mail, roles, phone, imgUrl } = req.body;
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

  if (roles){
    const foundRoles = await Role.find({name: {$in: roles}});
    newUser.roles = foundRoles.map(role => role._id);
  } else {
    const role = await Role.findOne({name: "user"});
    newUser.roles = [role._id];
  };

  const savedUser = await newUser.save();
  console.log(savedUser);
  const token = jwt.sign({id: savedUser._id}, config.SECRET, {expiresIn: 86400}); // expires in 1 day
  res.status(200).json({token});
};

export const signin = async (req, res) => {
  const userFound = await User.findOne({username: req.body.username}).populate("roles");
  if(!userFound){return res.status(400).json({message: "invalid user or password"})};
  const matchPassword = await User.comparePassword(req.body.password, userFound.password);
  if(!matchPassword){return res.status(401).json({message: "invalid user or password"})};

  const token = jwt.sign({id: userFound._id}, config.SECRET, {expiresIn: 86400});
  res.json({token: token});
};
