/* eslint-disable no-console */
import { Server } from "http"
import mongoose from "mongoose"
import app from "./app";
import { envVars } from "./app/config/env";
import { seedSuperAdmin } from "./app/utils/seedSuperAdmin";
let server: Server;



const startServer = async () => {
    try {
        await mongoose.connect(envVars.MONGO_URI)

    console.log("Database Connected Successfully!");

    server = app.listen(envVars.PORT, () => {
        console.log(`Server is listening at PORT ${envVars.PORT}`);
    })
    } catch (error) {
        console.log(error);
    }
}

(async () => {
   await startServer();
   await seedSuperAdmin();
})();

process.on("unhandledRejection", () => {
    console.log('Unhandled Rejection Detected!...Server Shutting Down');;

    if (server) {
        server.close(() => {
            process.exit(1);
        })
    }

    process.exit(1);
})

process.on("uncaughtException", () => {
    console.log('Uncaught Exception Detected!...Server Shutting Down');;

    if (server) {
        server.close(() => {
            process.exit(1);
        })
    }

    process.exit(1);
})

process.on("SIGTERM", () => {
    console.log('SIGTERM signal received!...Server Shutting Down');;

    if (server) {
        server.close(() => {
            process.exit(1);
        })
    }

    process.exit(1);
})

// Promise.reject(new Error("I forgot to catch this promise!"))

// throw new Error("I forgot to handle this local error!");

// Unhandled Rejection Error 
// uncaught rejection error 
//signal termination sigterm 