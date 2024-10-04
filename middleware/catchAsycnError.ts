import { Request, Response, NextFunction } from "express";

const CatchAsyncError = (theFunc: any) => (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(theFunc(req, res, next)).catch(next);
};

export default CatchAsyncError;