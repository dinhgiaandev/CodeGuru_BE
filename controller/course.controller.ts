import { Request, Response, NextFunction } from "express";
import CatchAsyncError from "../middleware/catchAsycnError"
import ErrorHandler from "../utils/ErrorHandle";
import cloudinary from "cloudinary";
import { createCourse } from "../services/course.service";


//upload course
export const uploadCourse = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = req.body;
        const thumbnail = data.thumbnail;

        // Kiểm tra nếu thumbnail là một chuỗi
        if (typeof thumbnail === 'string') {
            const myCloud = await cloudinary.v2.uploader.upload(thumbnail, {
                folder: "courses"
            });

            data.thumbnail = {
                public_id: myCloud.public_id,
                url: myCloud.secure_url
            };
        } else {
            return next(new ErrorHandler("Thumbnail must be a string URL", 400));
        }

        createCourse(data, res, next);
    } catch (error: any) {
        return next(new ErrorHandler(error.message, 500));
    }
});