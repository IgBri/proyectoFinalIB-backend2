import express from "express";
//import cors from "cors";

import passport from "passport";
import initializePassport from "./config/passport.config.js";
import cookieParser from "cookie-parser";
import {engine} from "express-handlebars";

//Routes
import propertiesRouter from "./routes/propertiesRouter.js";
import usersRouter from "./routes/usersRouter.js";
import viewsRouter from "./routes/viewsRouter.js";
import cartsRouter from "./routes/cartsRouter.js";
import ticketRouter from "./routes/ticketRouter.js";
import emailRouter from "./routes/emailRouter.js";


import config from "./config/config.js";
import {connectMongoDB} from "./utils.js";

const app = express();

//app.use(cors());
app.use(cookieParser("ClaveDeCookiePrueba"))

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");

//middleware y funcion de passport
app.use(passport.initialize());
initializePassport();

//Routers
app.use("/", viewsRouter);
app.use("/api/properties", propertiesRouter);
app.use("/api/users", usersRouter);
app.use("/api/carts", cartsRouter);
app.use("/api/tickets", ticketRouter);
app.use("/api/email", emailRouter); 

app.get("/ping", (req, res) => {
    res.json("pong")
});

connectMongoDB();

console.log("config.persist: ", config.persistence)

const SERVER_PORT = config.port;

app.listen(SERVER_PORT, () => {
    console.log(`Servidor inmobiliario activo en http://localhost:${SERVER_PORT}`)
});