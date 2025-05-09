import mongoose from "mongoose";

let cached = global.mongoose;

if(!cached){
    cached = global.mongoose = {conn:null , promise:null};
}

async function dbConnect() {
    const MONGO_URI = process.env.MONGO_URI!;

    if(!MONGO_URI){
        throw new Error(
            "Please Enter MONOGODB URI to enviroment variables."
        );
    }

    if(cached.conn){
        return cached.conn;
    }

    if(!cached.promise){
        const opts = {
            bufferCommands:false,
        };
        cached.promise = mongoose.connect(MONGO_URI,opts).then((mongoose)=> {return mongoose.connection})
    }

    try{
        cached.conn = await cached.promise;
    }catch(e){
        cached.promise = null;
        throw e;
    }
    
    return cached.conn;
}

export default dbConnect;