import { Redis } from "ioredis";
require('dotenv').config();

const redisClient = () => {
    if (process.env.REDIS_URL) {
        console.log('Đã kết nối tới Redis.');
        return process.env.REDIS_URL;
    }
    throw new Error('Kết nối tới Redis thất bại!');
};

const redis = new Redis(redisClient());

export default redis