import { createContainer, asClass, asFunction, asValue, InjectionMode } from "awilix";
import Server from "./server";
import StartUp from "./startup";

import config from "../config/environments";
import Routes from "../api/routes/index.routes";
import db from '../infrastructure/models';

//ROUTES
import UserRoutes from "./routes/user.routes";

//REPOSITORY, SERVICE Y CONTROLLER
import UserRepository from "../infrastructure/repositories/user.repository";
import UserService from "../services/user.service";
import UserController from "./controllers/user.controller";



const container = createContainer({
    injectionMode: InjectionMode.CLASSIC,
});

container.register({
    app: asClass(StartUp).singleton(),
    server : asClass(Server).singleton(),
    router : asFunction(Routes).singleton(),
})
.register({
    config : asValue(config),
    db: asValue(db)
})
.register({
    UserRoutes : asFunction(UserRoutes),
})
.register({
    UserRepository : asClass(UserRepository).singleton(),
})
.register({
    UserService : asClass(UserService).singleton(),
})
.register({
    UserController : asClass(UserController).singleton(),
})

export default container;