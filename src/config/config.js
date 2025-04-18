import { Command } from "commander";
import dotenv from "dotenv";

const program = new Command();

program
    .option("-d", "Variable para debug", false)
    .option("--mode <mode>", "Modo de trabajo", "development")
    .option("-p <port>", "Puerto del servidor", 8080)
    .option("--persist <mode>", "Modo de persistencia", "mongodb")
program.parse();

console.log("Modo de trabajo: ", program.opts().mode);

const enviroment = program.opts().mode;

dotenv.config({
    path: enviroment === "production" ? "./src/config/.env.production" : "./src/config/.env.development"
});

const PASSPORT_JWT_KEY = "Clave1-IB";

export default {
    port: process.env.PORT,
    mongoURL: process.env.MONGO_URL,
    persistence: program.opts().persist,
    adminName: process.env.ADMIN_NAME,
    adminPassword: process.env.ADMIN_PASSWORD,
    passport_key: PASSPORT_JWT_KEY,
    gmailAccount: process.env.GMAIL_ACCOUNT,
    gmailAppPassword: process.env.GMAIL_APP_PASSWORD
};