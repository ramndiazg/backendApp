import User from "../models/User";

export const signup = async (req, res) => {
    const {name, lastName, username, password, mail, roles, phone, imgUrl} = req.body;
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
    })
    console.log(newUser);
    res.json(newUser)
};

export const signin = async (req, res) => {
    res.json('signin')
};