import { NextFunction, Request, Response } from "express";
import { check  } from "express-validator";
import validateHelper from '../middlewares/validate.middleware';

const validateCreate = [
    check('username')
        .exists()
        .withMessage('The parameter is necessary: username')
        .isString()
        .isLength({min: 4})
        .withMessage('The total characters is minimum')
        .notEmpty()
        .withMessage('you can not be empty'),
    check('password')
        .exists()
        .withMessage('The parameter is necessary: password')
        .isLength({min: 6})
        .withMessage('The total characters is minimum')
        .notEmpty()
        .withMessage('You can not be empty'),
    check('name')
        .exists()
        .withMessage('The parameter is necessary: name'),
    check('surnames')
        .exists()
        .withMessage('The parameter is necessary: surnames'),
    check('email')
        .exists()
        .withMessage('The parameter is necessary: email')
        .isEmail()
        .withMessage('Send correct format'),
    (req : Request, res: Response, next: NextFunction) => {
        validateHelper(req, res, next);
    }
]

const validateUpdate = [
    check('id')
        .exists()
        .withMessage('The parameter is necessary: id')
        .notEmpty()
        .withMessage('You can not be empty'),
    check('newPassword')
        .exists()
        .withMessage('The parameter is necessary: newPassword'),
    (req : Request, res: Response, next: NextFunction) => {
        validateHelper(req, res, next);
    }
]

export default {validateCreate, validateUpdate};
