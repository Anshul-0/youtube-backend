//require ('dotenv').config({path: './env});

import dotenv from "dotenv";
import { connect } from "mongoose";
import connectDb from "./db/index.js";

dotenv.config({
    path: './env'
})

connectDb();












// import express from "express";
// const app = express();

// (async() => {
//     try {
//         await mongoose.connect(`${proccess.env.MONGODB_URL}/${DB_NAME}`);
//         app.on("error", (error)=>{
//             console.log("ERRR: ", error);
//             throwerror
//         })

//         app.listen(process.env.PORT, () =>{
//             console.log(`App is listening in port ${process.env.PORT}`);
            
//         })

//     } catch (error) {
//         console.error("ERROR", error);
//         throw err
//     }
// })()
    
