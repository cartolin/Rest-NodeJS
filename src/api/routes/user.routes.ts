import { Router } from "express";
import UserController from "../controllers/user.controller";
import validate from "../validators/user.validator";
import validatePages from "../validators/pagination.validator";

export default  function (UserController: UserController){
    const router = Router();

    router.get('/', UserController.getAll.bind(UserController));

    router.get('/search', validatePages.validateSearch, UserController.getAllAndCount.bind(UserController));

    router.get('/:id', UserController.getById.bind(UserController));

    router.post('/', validate.validateCreate, UserController.create.bind(UserController));

    router.put('/:id', validate.validateUpdate, validate.validateCreate, UserController.update.bind(UserController));
    
    router.delete('/:id', UserController.delete.bind(UserController));

    return router;
};
