import { Op, WhereOptions } from "sequelize";
import { User } from "../../domain/user";
import UserModel from "../models/user.model";
import BaseRepository from "./base.repository";

class UserRepository extends BaseRepository<User, number> {

    constructor(){
        super(UserModel);
    }

    public getAllAndCount(page: number, size: number, query: any){
        const {username, email, name} = query;

        let queryParams: WhereOptions = {};

        if (username && (username as string).length > 0){
            queryParams['username'] = (username as string);
        }

        if (email && (email as string).length > 0){
            queryParams['email'] = (email as string);
        }

        if (name && (name as string).length > 0){
            queryParams['name'] = {[Op.like]: `%${(name as string)}%`} 
        }

        return UserModel.findAndCountAll({
            limit: size,
            offset: page * size,
            where: queryParams
        }).catch((e: any) => {
            throw new Error(e);
        });
    }
}

export default UserRepository;