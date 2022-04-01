import { Base } from "./base";

export interface User extends Base{
    id : number | string,
    username : string,
    password : string,
    name: string,
    surnames: string,
    email : string
}