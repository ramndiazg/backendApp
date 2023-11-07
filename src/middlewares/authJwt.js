import jwt from 'jsonwebtoken';
import config from '../config';
import User from '../models/User';
import Role from '../models/Role';

export const verifyToken = async (req, res, next) => {
    try {
        const token = req.headers["x-access-token"];
        if(!token) return res.status(403).json({message: "no token available"});
        const decoded = jwt.verify(token, config.SECRET)
        req.userId = decoded.id
        const user = User.findById(req.userId, {password: 0});
        if (!user) return res.status(404).json({message: "user not found"});
    } catch (error) {
        return res.status(401).json({message: "unauthorized"});
    }

    next();
};

export const isModerator = async (req, res, next) => {
    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({message: "user not found"});
    const roles = await Role.find({_id: {$in: user.roles}});
    if (!roles) return res.status(404).json({message: "this role not exist"});

    for(let i = 0; i < roles.length; i++) {
        if (roles[i].name === "moderator"){
            next()
            return
        }
    }
    return res.status(403).json({message: "moderator role is required"});
};

export const isAdmin = async (req, res, next) => {
    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({message: "user not found"});
    const roles = await Role.find({_id: {$in: user.roles}});
    if (!roles) return res.status(404).json({message: "this role not exist"});

    for(let i = 0; i < roles.length; i++) {
        if (roles[i].name === "admin"){
            next()
            return
        }
    }
    return res.status(403).json({message: "admin role is required"});
};