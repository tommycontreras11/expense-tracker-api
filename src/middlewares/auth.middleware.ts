import { NextFunction, Request, Response } from "express";
import { UnauthorizedException } from "../exceptions/unauthorized-exception.js";
import { verifyToken } from "../utils/jwt.util.js";

export async function validateAuth(req: Request, _res: Response, next: NextFunction) {
    const authHeader = req.headers["authorization"]

    if(!authHeader?.startsWith("Bearer ")) 
        throw new UnauthorizedException("Unauthorized")

    const token = authHeader.split(" ")[1]

    if(!token) 
        throw new UnauthorizedException("Unauthorized")

    try {
        req.user = verifyToken(token)
        next()   
    } catch (error) {
        throw new UnauthorizedException("Invalid Access Token")
    }
}