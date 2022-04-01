import Server from "./server";

class StartUp{

    private server: Server;

    constructor(server : Server){
        this.server = server;        
    }

    public async start(){
        await this.server.start();
    }

}

export default StartUp;