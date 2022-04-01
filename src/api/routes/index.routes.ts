import { Router } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

export default function(UserRoutes: any){
    const router = Router();
    const apiRouter = Router();

    apiRouter.use(cors())
             .use(bodyParser.json());

    
    apiRouter.use('/users', UserRoutes);

    router.use('/api', apiRouter);

    return router;
}