import dotenv from "dotenv";
dotenv.config({ path: process.env.NODE_ENV === "development" ? '.dev.env' : '.env' });
import express from "express";
import http from "http";
import morgan from "morgan";
import cors from "cors";
import useDatabase from "./services/database/databaseService";
import useRoutes from "./routes/index";
const PORT = process.env.PORT || 5000;

class App {
    constructor(port) {
        this.port = port;
        this.app = express().disable("x-powered-by");

        this.server = http.createServer(this.app);
        this.useMiddlewares();
        useDatabase();
        useRoutes(this.app);
        this.run();
    }
    useMiddlewares() {
        this.app.use(cors());
        this.app.use(morgan("dev"));
        this.app.use(express.json());
        this.app.use(express.json({ limit: "1024mb", extended: true }));
        this.app.use(
            express.urlencoded({
                limit: "1024mb",
                extended: true,
                parameterLimit: 50000,
            })
        );
    }
    run() {
        this.server.listen(this.port, () => {
            console.log(`> Server is running on ${this.port}...`);
        });
    }
}
new App(PORT);
