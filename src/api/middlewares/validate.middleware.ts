import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { DataResponse } from "../dtos/data.resp.dto";

const validateHelper =async (req : Request, res: Response, next: NextFunction) => {
    try{
        validationResult(req).throw();
        return next();
    }catch(e: any){
        const dataResponse: DataResponse = {
            status : false,
            errors : e.array()
        }
        
        res.status(403)
        res.json(dataResponse)
    }
}

export default validateHelper;