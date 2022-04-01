import { Application } from "express";
import express from 'express';

class Server{

    private app: Application;
    private config;

    constructor(config: any, router: any){
        this.config = config;
        
        this.app = express();
        this.app.use(router);
    }

    public start(){
        return new Promise((resolve, reject) => {
            this.app.listen(this.config.PORT, () =>{
                console.log('Server running on port ' + this.config.PORT);
                resolve;
            });
        });
    }
}

export default Server;