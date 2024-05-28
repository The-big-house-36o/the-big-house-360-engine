
import { Request, Response, NextFunction } from "express";
const customError = (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const statusCode = err.statusCode ? err.statusCode : 500;

    return res.status(statusCode).json({
        message: err.message,
        stack: err.stack
    });
};

export default customError