import { Request, Response, NextFunction } from "express";
import CatchAsyncError from "./catchAsycnError";
import ErrorHandler from "../utils/ErrorHandle";
import jwt, { JwtPayload } from 'jsonwebtoken';
import connectRedis from "../utils/redis";

export const isAuthenticated = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    const access_token = req.cookies.access_token

    if (!access_token) {
        return next(new ErrorHandler("Vui lòng đăng nhập để truy cập nguồn tài nguyên này", 400));
    }

    const decoded = jwt.verify(access_token, process.env.ACCESS_TOKEN as string) as JwtPayload;

    if (!decoded) {
        return next(new ErrorHandler("access token không hợp lệ", 400));
    }

    const user = await connectRedis().get(decoded.id);

    if (!user) {
        return next(new ErrorHandler("Người dùng không được tìm thấy", 400));
    }

    req.user = JSON.parse(user);

    next();
});

//validate user role
export const authenticateRole = (...roles: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        if (!roles.includes(req.user?.role || "")) {
            return next(new ErrorHandler(`${req.user?.role} không được phép truy cập vào nguồn tài nguyên này`, 403));
        }
        next();
    }
}