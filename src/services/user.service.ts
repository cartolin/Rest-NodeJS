import { User } from "../domain/user";
import UserRepository from "../infrastructure/repositories/user.repository";
import BaseService from "./base.service";

class UserService extends BaseService<User, number>{
    private userRepository : UserRepository;

    constructor(UserRepository: UserRepository){
        super(UserRepository);
        this.userRepository = UserRepository;
    }

    public async getAllAndCount(page: number, size: number, query: any){
        return this.userRepository.getAllAndCount(page, size, query);
    }
}

export default UserService;