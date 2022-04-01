import { NextFunction, Request, Response } from "express";
import {query  } from "express-validator";
import validateHelper from '../middlewares/validate.middleware';

const validateSearch = [
    query('page')
        .exists()
        .withMessage('The parameter is necessary: page')
        .isNumeric()
        .withMessage('It has to have a numeric value'),
    query('size')
        .exists()
        .withMessage('The parameter is necessary: size')
        .isNumeric()
        .withMessage('It has to have a numeric value'),
    (req : Request, res: Response, next: NextFunction) => {
        validateHelper(req, res, next);
    }
]

export default {validateSearch};

