import dotenv from 'dotenv';
dotenv.config({path:'./.env'});
const db_url= process.env.mongo_db_url;
const PORT= 3000;
export {
    db_url,
    PORT
};