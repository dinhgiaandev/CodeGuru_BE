import mongoose, { Model, Schema, Document } from "mongoose";
import bcrypt from 'bcryptjs';
require('dotenv').config();
import jwt from 'jsonwebtoken';


//regex email
const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


export interface IUser extends Document {
    _id: string;
    name: string;
    email: string;
    password: string;
    avatar: {
        public_id: string;
        url: string;
    },
    role: string;
    isVerified: boolean;
    courses: Array<{ courseId: string }>;
    comparePassword: (password: string) => Promise<boolean>;
    SignAccessToken: () => string;
    SignRefreshToken: () => string;
};

const userSchema: Schema<IUser> = new mongoose.Schema({
    name: {
        type: String,
        require: [true, "Vui lòng điền tên của bạn!"],
    },
    email: {
        type: String,
        require: [true, "Vui lòng điền email của bạn!"],
        validate: {
            validator: function (value: string) {
                return emailRegex.test(value);
            },
            message: "Vui lòng điền đúng định dạng email!",
        },
        unique: true
    },
    password: {
        type: String,
        // require: [true, "Vui lòng nhập mật khẩu của bạn!"],
        minlength: [6, "Mật khẩu phải có ít nhất 6 ký tự"],
        select: false,
    },
    avatar: {
        public_id: String,
        url: String,
    },
    role: {
        type: String,
        default: "Học viên", //Mặc định
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    courses: [
        {
            courseId: String
        }
    ],
}, { timestamps: true });

//Hash password
userSchema.pre<IUser>('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

//sign access_token
userSchema.methods.SignAccessToken = function () {
    return jwt.sign({ id: this._id }, process.env.ACCESS_TOKEN || '', {
        expiresIn: "10m",
    });
}

//sign refresh_token
userSchema.methods.SignRefreshToken = function () {
    return jwt.sign({ id: this._id }, process.env.REFRESH_TOKEN || '', {
        expiresIn: "7d",
    });
}

//so sánh pass
userSchema.methods.comparePassword = async function (enteredPassword: string): Promise<boolean> {
    return await bcrypt.compare(enteredPassword, this.password);
};

const userModel: Model<IUser> = mongoose.model("User", userSchema);

export default userModel;
