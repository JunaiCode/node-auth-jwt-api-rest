import { User } from "../interfaces/user.interface";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
const JWT_SECRET = process.env.JWT_SECRET || 'default-secret';

export const generateAuthToken = (user: User):string => {
    const token = jwt.sign({ id: user.id,email:user.email }, JWT_SECRET, {
        expiresIn: "1h"
    });

    return token;
}

export const verifyAuthToken = (token: string): User | string => {
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        return decoded as User;
    } catch (error) {
        return "Invalid token";
    }
}

