import  currentEnv from "../../config/environments";

import {Sequelize } from 'sequelize';

let sequelize: Sequelize;

try{
    const config = currentEnv.DB;
    sequelize = new Sequelize(config.database, config.username, config.password, currentEnv);
}catch (e: any){
    throw new Error(e); 
}

export  { Sequelize, sequelize };

export  default { Sequelize, sequelize };