import { Request, Response } from "express";
import { User } from "../../domain/user";
import UserService from "../../services/user.service";
import { DataResponse } from "../dtos/data.resp.dto";
import { PaginationDto } from "../dtos/pagintation.resp.dto";
import { UserDto } from "../dtos/user.dto";

class UserController{

    private userService: UserService;

    private validate: DataResponse = {
        status : true
    }
    
    constructor(UserService: UserService){
        this.userService = UserService;
    }

    private async mapperUsers (data : User[]){
        const usuarioResponse = data.map((model: User) => {
            const usuario: UserDto = {
                id: model.id,
                username: model.username,
                name: model.name,
                surnames: model.surnames,
                email: model.email
            };
            return usuario;
        })
        return usuarioResponse;
    }

    private async mapperUser(data : User){
        const usuario: UserDto = {
            id: data.id,
            username: data.username,
            name: data.name,
            surnames: data.surnames,
            email: data.email
        };
        return usuario;
    }

    public async getAll(req : Request, res: Response){
        try{
            const users: any[] = await this.userService.getAll();

            if (!users || users.length === 0){
                this.validate = {
                    status : true,
                    send : []
                }
                return res.json(this.validate);
            }
    
            const userResponse = await this.mapperUsers(users);
            if (userResponse){
                this.validate = {
                    status : true,
                    send : userResponse
                }
            }
    
            return res.json( this.validate);
        }catch (e){
            this.validate = {
                status : false,
                errors : 'Contact administrator, error listing.'
            }
            return res.status(500).json(this.validate);
        }
    }

    public async getAllAndCount(req : Request, res: Response){
        try{
            const {page, size} = req.query;
            const query = req.query;

            let PAGE :number = 0, SIZE : number = 0;

            if (!page || !size){
                this.validate.send = [];
                return res.json(this.validate);
            }

            PAGE = Number(page);
            SIZE = Number(size);

            const users: any = await this.userService.getAllAndCount(PAGE, SIZE, query);

            const search: PaginationDto = {
                total : users.count,
                data : users.rows
            }

            const userResponse = await this.mapperUsers(search.data);
            if (userResponse){
                search.data = userResponse;

                this.validate = {
                    status : true,
                    send : search
                }
            }

            return res.json(this.validate);

        }catch (e){
            this.validate = {
                status : false,
                errors : 'Contact administrator, error listing when searching.'
            }
            return res.status(500).json(this.validate);
        }
    }

    public async getById(req : Request, res: Response){
        try{
            const {id} = req.params;

            const idUser = Number(id);

            if(!id || isNaN(idUser)){
                this.validate = {
                    status : false,
                    errors : `Incorrect identifier ${id}.`
                }
                return res.status(404).json(this.validate)
            }

            const user = await this.userService.getById(idUser);
            if(!user){
                this.validate = {
                    status : false,
                    errors : `There is no user with identifier ${id}`
                }
                return res.status(404).json(this.validate)
            }

            const userResponse = await this.mapperUser(user);

            this.validate = {
                status : true,
                send : userResponse
            }

            return res.json(this.validate);
            
        }catch(e){
            this.validate = {
                status : false,
                errors : 'Contact administrator, error getting.'
            }
            return res.status(500).json(this.validate);
        }
    }


    public async create(req : Request, res: Response){
        try{
            const {body} = req;

            const user: User = {
                id: null,
                username: body.username,
                password: body.password,
                name: body.name,
                surnames: body.surnames,
                email: body.email
            }

            if (!user){
                this.validate = {
                    status: false,
                    errors : 'Invalid data'
                }
                return res.status(400).json(this.validate)
            }

            const createUser = await this.userService.create(user);

            if(!createUser){
                this.validate = {
                    status: false,
                    errors : 'The user was not generated correctly.'
                }
                return res.status(400).json(this.validate)
            }

            const userResponse: UserDto = await this.mapperUser(createUser);

            this.validate = {
                status: true,
                send: userResponse
            }
    
            return res.json(this.validate);

        }catch (e) {
            this.validate = {
                status : false,
                errors : 'Contact administrator, generating errors.'
            }
            return res.status(500).json(this.validate);
        }
    }

    public async update(req : Request, res: Response){
        try{
            const {id} = req.params;
            const {body} = req;

            const user: User = {
                id: Number(body.id) | 0,
                username: body.username,
                password: body.password,
                name: body.name,
                surnames: body.surnames,
                email: body.email,
            }
            if (!user || Number(id) !== user.id){
                this.validate = {
                    status: false,
                    errors : 'Invalid data.'
                }
                return res.status(400).json(this.validate)
            }
            
            const updateUser = await this.userService.update(user.id, user);
            if(!updateUser){
                this.validate = {
                    status: false,
                    errors : 'The user was not updated correctly.'
                }
                return res.status(400).json(this.validate)
            }
    
            this.validate = {
                status: true,
                send: updateUser
            }
    
            return res.json(this.validate);
        }catch (e) {
            this.validate = {
                status : false,
                errors : 'Contact administrator, error updating.'
            }
            return res.status(500).json(this.validate);
        }
    }

    public async delete(req : Request, res: Response){
        try{
            const {id} = req.params;

            const idUser = Number(id);

            if(!id || isNaN(idUser)){
                this.validate = {
                    status : false,
                    errors : `Incorrect identifier ${id}.`
                }
                return res.status(404).json(this.validate)
            }

            const deleteUsuario = await this.userService.delete(idUser);
            if(!deleteUsuario){
                this.validate = {
                    status : false,
                    errors : `Failed to delete user with identifier ${id}`
                }
                return res.status(404).json(this.validate)
            }
    
            this.validate = {
                status : true,
                send : deleteUsuario
            }

            return res.json(this.validate);
        }catch (e) {
            this.validate = {
                status : false,
                errors : 'Contact administrator, error deleting.'
            }
            return res.status(500).json(this.validate);
        }
    }

}

export default UserController;