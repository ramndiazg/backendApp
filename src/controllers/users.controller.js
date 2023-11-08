import User from '../models/User'
import jwt from "jsonwebtoken";
import config from "../config"
import Role from "../models/Role";


export const getUsers = async (req, res) => {
    const users = await User.find()
    res.status(200).json(users);
};

export const getUserById = async (req, res) => {
    const user = await User.findById(req.params.userId)
    res.status(200).json(user);
};

export const createUser = async (req, res) => {
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

export const updateUserById = async (req, res) => {
    const updatedUser = await User.findByIdAndUpdate(req.params.userId, req.body, {new: true});
    res.status(200).json(updatedUser);
};

export const deleteUserById = async (req, res) => {
    await User.findByIdAndDelete(req.params.userId)
    res.status(204).json('user deleted');
};