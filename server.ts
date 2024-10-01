import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import connectDB from './utils/db'; // Import kết nối MongoDB

const app = express();

// Load biến môi trường từ file .env.development
dotenv.config({ path: path.resolve(__dirname, '.env.development') });

// Kết nối tới database
connectDB();

// Tạo server
app.listen(process.env.PORT, () => {
     console.log(`Server is running on port ${process.env.PORT}`);
});

// Body parser
app.use(express.json({ limit: "50mb" }));

// Cookie parser
app.use(cookieParser());

// CORS - cho phép chia sẻ tài nguyên giữa các domain khác nhau
app.use(cors({
     origin: process.env.ORIGIN
}));

// Test API
app.get("/test", (req: Request, res: Response, next: NextFunction) => {
     res.status(200).json({
          success: true,
          message: "API đang hoạt động"
     });
});

// Xử lý đường dẫn không xác định
app.all("*", (req: Request, res: Response, next: NextFunction) => {
     const err = new Error(`Đường dẫn ${req.originalUrl} không được tìm thấy`);
     (err as any).statusCode = 404;
     next(err);
});

// Middleware xử lý lỗi
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
     const statusCode = err.statusCode || 500;
     res.status(statusCode).json({
          success: false,
          message: err.message || 'Lỗi server'
     });
});

export default app;
