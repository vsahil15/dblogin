import mongoose from 'mongoose';
import { db_url } from './config.js';
 async function connectDB(){
    await mongoose.connect(db_url).then(
        ()=>{
            console.log('DB connected');
        }
       ).catch((err)=>{
       console.error("DB connection error", err);
       process.exit(1);
       })
};

export {connectDB};