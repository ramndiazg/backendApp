import {model, Schema} from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new Schema({
    name: String,
    lastName: String,
    username: {
        type: String,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    mail: {
        type: String,
        unique: true
    },
    roles: [{
        ref: 'Role',
        type: Schema.Types.ObjectId
    }],
    phone: {
        type: String,
        unique: true
    },
    imgUrl: String,
},{
    timestamps: true,
    versionKey: false
})

userSchema.statics.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
};

userSchema.statics.comparePassword = async (password, receivedPassword) => {
    return await bcrypt.compare(password, receivedPassword);
};

export default model('User', userSchema);