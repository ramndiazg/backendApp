import User from '../models/User'


export const getUsers = async (req, res) => {
    const users = await User.find()
    res.status(200).json(users);
};

export const getUserById = async (req, res) => {
    const user = await User.findById(req.params.userId)
    res.status(200).json(user);
};

export const createUser = async (req, res) => {
    const {name, lastName, username, password, mail, phone, imgUrl}= req.body
    const newUser = new User({name, lastName, username, password, mail, phone, imgUrl})
    const userSaved = await newUser.save()
    res.status(201).json(userSaved);
};

export const updateUserById = async (req, res) => {
    const updatedUser = await User.findByIdAndUpdate(req.params.userId, req.body, {new: true});
    res.status(200).json(updatedUser);
};

export const deleteUserById = async (req, res) => {
    await User.findByIdAndDelete(req.params.userId)
    res.status(204).json('user deleted');
};