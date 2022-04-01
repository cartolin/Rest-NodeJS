const envJson = require("../../../env.json");

//PORT NODE
const port = process.env.PORT || 3000;

//INI - Configurando variable de Entorno
const ENTORNO = (envJson[process.env.NODE_ENV || "NODE_ENV"]) || 'development';
const ENV  = envJson[process.env.NODE_ENV || ENTORNO]
process.env = ENV;
//END - Configurando variable de Entorno

import PRODUCTION from './production';
import DEVELOPMENT from './development';
import QA from './qa';

let currentEnv = DEVELOPMENT;

if (ENTORNO === 'production'){
    currentEnv = PRODUCTION;
}else if (ENTORNO === 'qa'){
    currentEnv = QA
}

currentEnv.PORT = port;
//currentEnv.DB.database = 'ds';

console.log(currentEnv, 'BD');

export default currentEnv;