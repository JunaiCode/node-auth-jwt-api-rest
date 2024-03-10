import { Request, Response } from "express";
import prisma from "../model/products";

export const getProduct = async (req: Request, res: Response) : Promise<void> => {
    try{
    const { id } = req.params;
    const product = await prisma.findUnique({
        where: {
            id: parseInt(id)
        }
    });
    if(product){
        res.status(200).json(product);
    }else{
        res.status(404).json({ message: "Product not found" });
    }
}catch(error:any){
    console.log(error);
    res.status(500).json({ message: "Error getting product" });
}
};

export const getProducts = async (req: Request, res: Response) : Promise<void> => {
    try{
    const products = await prisma.findMany();
    res.status(200).json(products);
    }catch(error:any){
        console.log(error);
        res.status(500).json({ message: "Error getting products" });
    }
};

export const createProduct = async (req: Request, res: Response) : Promise<void> => {
    const {name, description, price, stock } = req.body;
    try{
        if(!name) throw new Error("Name is required");
        if(!description) throw new Error("Description is required");
        if(!price) throw new Error("Price is required");
        if(!stock) throw new Error("Stock is required");
        const product = await prisma.create({
            data: {
                name,
                description,
                price,
                stock
            }
        });
        res.status(201).json(product);
}catch(error:any){
    console.log(error);
    if(!name){
        res.status(400).json({ message: "Name is required" });
    }
    if(!description){
        res.status(400).json({ message: "Description is required" });
    }
    if(!price){
        res.status(400).json({ message: "Price is required" });
    }
    if(!stock){
        res.status(400).json({ message: "Stock is required" });
    }
    res.status(500).json({ message: "Error creating product" });
}
};

export const updateProduct = async (req: Request, res: Response) : Promise<void> => {
    try{
    const { id } = req.params;
    const { name, description, price, stock } = req.body;
    const product = await prisma.update({
        where: {
            id: parseInt(id)
        },
        data: {
            name,
            description,
            price,
            stock
        }
    });
    res.status(200).json(product);
    }catch(error:any){
    console.log(error);
    res.status(500).json({ message: "Error updating product" });
    }
};

export const deleteProduct = async (req: Request, res: Response) : Promise<void> => {
    try{
    const { id } = req.params;
    const product = await prisma.delete({
        where: {
            id: parseInt(id)
        }
    });
    res.status(200).json(product);
    }catch(error:any){
    console.log(error);
    res.status(500).json({ message: "Error deleting product" });
    }
};