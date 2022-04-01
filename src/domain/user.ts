import { Base } from "./base";

export interface User extends Base{
    id : number | string | any,
    username : string,
    password : string,
    name: string,
    surnames: string,
    email : string
}