
import jwt, { Secret } from "jsonwebtoken";
import { config } from "dotenv";
import { Request, Response, NextFunction } from "express";


config();

interface customRequest extends Request {
    token: string,
}

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.header("authorization");
    if (!token) {
        return res.status(401).send("Access denied");
    }

    try {
        const secret: Secret = process.env.SECRET_TOKEN as Secret;
        const verified = jwt.verify(token, secret) as string;
        (req as customRequest).token = verified;
        next();
    } catch (error) {
        return res.status(500).send("Invalid token");
    }
};

export default verifyToken;