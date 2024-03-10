import { Request, Response } from "express";
import { hashPassword, comparePasswords } from "../services/password.service";
import prisma from "../model/users";
import { generateAuthToken } from "../services/auth.service";

export const register = async (req: Request, res:Response): Promise<void> => {
    const { email, password } = req.body;

    try{
       if(!password) throw new Error("Password is required");
       if(!email) throw new Error("Email is required");
       const hashedPassword = await hashPassword(password);
       const user = await prisma.create({
              data: {
                email,
                password: hashedPassword
              }
         });

         const token = generateAuthToken(user);
         res.status(201).json({ token });
       
    }catch(error:any){
        console.log(error);
        if(!email){
            res.status(400).json({ message: "Email is required" });
        }
        if(!password){
            res.status(400).json({ message: "Password is required" });
        }

        if(error.code === "P2002" && error.meta.target.includes("email")){
            res.status(400).json({ message: "Email already exists" });
        }

        res.status(500).json({ message: "Error creating user" });
    }
    };

export const login = async (req: Request, res:Response): Promise<void> => {
    const { email, password } = req.body;
    try{
        if(!email) throw new Error("Email is required");
        if(!password) throw new Error("Password is required");
        const user = await prisma.findUnique({
            where: {
                email
            }
        });

        if(!user) throw new Error("User not found");
        const passwordMatch = await comparePasswords(password, user.password);
        if(!passwordMatch) throw new Error("Invalid credentials");
        const token = generateAuthToken(user);
        res.status(200).json({ token });
    }catch(error:any){
        console.log(error);
        if(!email){
            res.status(400).json({ message: "Email is required" });
        }
        if(!password){
            res.status(400).json({ message: "Password is required" });
        }
        if(error.message === "User not found"){
            res.status(404).json({ message: "User not found" });
        }
        if(error.message === "Invalid credentials"){
            res.status(401).json({ message: "Invalid credentials" });
        }
        res.status(500).json({ message: "Error logging in" });
    }
};