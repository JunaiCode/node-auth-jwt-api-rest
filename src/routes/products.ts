import express, { NextFunction, Request, Response } from 'express';
import { createProduct, deleteProduct, getProduct, getProducts, updateProduct } from '../controllers/productsController';
import { verifyAuthToken } from '../services/auth.service';

// Middleware para validar el token
const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
    // Leer el header de autenticación
    const authHeader = req.headers['authorization'];
    // Obtener el token
    const token = authHeader && authHeader.split(' ')[1];
    // Si no existe el token
    if (token == null) return res.sendStatus(401).json({ message: "Token is required" });
    // Verificar el token
    if(verifyAuthToken(token) === "Invalid token"){
        return res.sendStatus(403).json({ message: "Invalid token" });
    }
    // Continuar con la petición
    next();
}
export const productsRouter = express.Router();

productsRouter.get('/',authenticateToken, getProducts);
productsRouter.get('/:id',authenticateToken, getProduct);
productsRouter.post('/',authenticateToken, createProduct);
productsRouter.put('/:id',authenticateToken, updateProduct);
productsRouter.delete('/:id',authenticateToken, deleteProduct);


export default productsRouter;