import { Response } from "express";
import connectRedis from "../utils/redis";


//get user by id
export const getUserById = async (id: string, res: Response) => {
    const userJson = await connectRedis().get(id);

    if (userJson) {
        const user = JSON.parse(userJson)
        res.status(201).json({
            success: true,
            user,
        })
    }
}