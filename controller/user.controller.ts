import { Request, Response, NextFunction } from 'express'
import userModel from '../models/user.model'
import ErrorHandler from '../utils/ErrorHandle'
import CatchAsyncError from '../middleware/catchAsycnError'
import jwt, { Secret } from 'jsonwebtoken'
import dotenv from 'dotenv';
import ejs from 'ejs'
import path from 'path'
import sendMail from '../utils/sendMail'


// Load biến môi trường từ file .env.development
dotenv.config({ path: path.resolve(__dirname, '.env.development') });

//register
interface IRegisterBody {
    name: string,
    email: string,
    password: string,
    avatar?: string
}

export const registerUser = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, email, password } = req.body;
        const isEmailExist = await userModel.findOne({ email });
        if (isEmailExist) {
            return next(new ErrorHandler("Email này đã tồn tại", 400))
        };

        const user: IRegisterBody = {
            name,
            email,
            password,
        };
        const activationToken = createActivationToken(user);
        const activationCode = activationToken.activationCode;
        const data = { user: { name: user.name }, activationCode };
        const html = await ejs.renderFile(path.join(__dirname, "../mails/activation-mail.ejs"), data);
        try {
            await sendMail({
                email: user.email,
                subject: "Kích hoạt tài khoản - CodeGuru",
                template: "activation-mail.ejs",
                data
            });

            res.status(201).json({
                success: true,
                message: `Hãy kiểm tra hộp thư của bạn: ${user.email} để kích hoạt tài khoản!`,
                activationToken: activationToken.token
            })
        } catch (error: any) {
            return next(new ErrorHandler(error.message, 400))
        }
    }
    catch (error: any) {
        return next(new ErrorHandler(error.message, 400))
    }
});

interface IActivationToken {
    token: string;
    activationCode: string;
}

export const createActivationToken = (user: any): IActivationToken => {
    const activationCode = Math.floor(1000 + Math.random() * 9000).toString();
    const token = jwt.sign({
        user, activationCode
    }, process.env.ACTIVATION_SECRET as Secret,
        {
            expiresIn: "10m",  //giới hạn token
        });
    return { token, activationCode };
}