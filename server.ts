import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import cors from 'cors';
import cookiesParser from 'cookie-parser';
import { error } from 'console';

const app = express();

// __dirname config 
dotenv.config({ path: path.resolve(__dirname, '.env.development') });

// create sever
app.listen(process.env.PORT, () => {
     console.log(`Server is running on port ${process.env.PORT}`);
});

// body parser
app.use(express.json({ limit: "50mb" }));

// cookie parser
app.use(cookiesParser());

// cors => cross origin resource sharing
app.use(cors({
     origin: process.env.ORIGIN
}));

// test api
app.get("/test", (req: Request, res: Response, next: NextFunction) => {
     res.status(200).json({
          success: true,
          message: "API đang hoạt động"
     });
});

// unknown route
app.all("*", (req: Request, res: Response, next: NextFunction) => {
     const err = new Error(`Đường dẫn ${req.originalUrl} không được tìm thấy `) as any;
     err.statusCode = 404;
     next(error);
});

export default app;