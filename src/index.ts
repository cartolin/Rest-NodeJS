
import dotenv from 'dotenv';

//Config dotenv
dotenv.config();

import container from './api/container';
const application = container.resolve('app');
const db = container.resolve('db');

db.sequelize.sync();
application.start()
    .then( async () => {
        console.log('start Application');
        await db.sequelize.sync();
    })
    .catch( (err: any) => {
        process.exit();
    });
