import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';

// Load biến môi trường từ file .env.development
dotenv.config({ path: path.resolve(__dirname, '.env.development') });

const connectDB = async () => {
    const dbUrl: string = process.env.DB_URL || '';
    try {
        const conn = await mongoose.connect(dbUrl);
        console.log(`Database đã kết nối thành công: ${conn.connection.host}`);
    } catch (error) {
        // Kiểm tra xem error có phải là một đối tượng không
        if (error instanceof Error) {
            console.error(`Lỗi kết nối MongoDB: ${error.message}`);
        } else {
            console.error(`Lỗi kết nối MongoDB: ${error}`); // In ra toàn bộ error nếu không phải là Error
        }
        process.exit(1); // Dừng server nếu không kết nối được
    }
};

export default connectDB;