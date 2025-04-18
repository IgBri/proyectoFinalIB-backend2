import MongoSingleton from "./config/db/mongodb-singleton.js";

import {fileURLToPath} from "url";
import { dirname } from "path";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import passport from "passport";

import config from "./config/config.js";

//------------------------------------

export const connectMongoDB = async () => {
    try {
        await MongoSingleton.getInstance();
    } catch (error) {
        console.log("Error en la conexion a MongoDB", error);
    }

};

//-----------------------------------

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default __dirname;

//---------------------

//Generar hash
export const createHash = (password) => bcrypt.hashSync(password, bcrypt.genSaltSync(10));

//Comparar los hashes
export const isValidPassword = (user, password) => {
    return bcrypt.compareSync(password, user.password)
};

export const generateJWToken = (user) => {
    return jwt.sign({user}, config.passport_key, {expiresIn: "2h"});
};

export const authToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    console.log("El token esta en el header");
    console.log(authHeader); //con esta linea veremos con JWT con la palabra BEAr que debemos quitar con el split

    if(!authHeader){
        return res.status(403).send({ error:"Usuario no autenticado mediante token (JWT)" });
    };

    const token = authHeader.split(" ")[1]

    jwt.verify(token, PRIVATE_KEY, (error, credentials) => {
        if(error) return res.status(403).send({error: "Token invalido. No estas autorizado"});

        req.user = credentials.user;
        console.log(req.user);

        next();
    });
};

export const passportCall = (strategy) => {
    return async (req, res, next) => {
        passport.authenticate(strategy, function (err, user, info) {
            if(err){
                console.log("ERROR EN PASSPORTCALL: ", err)
                return next(err);
            }
            if(!user) {
                console.log("ERROR, NO HAY USER")
                return res.status(401).send({message: "aQUI ESTAMOS", error: info.messages ? info.messages : info.toString()});
            };

            req.user = user;
            next()
        }) (req, res, next);
    }
};

export const authorizationTo = (strategy, userAuth) => {
    return async (req, res, next) => {
        passport.authenticate(strategy, function (err, user, info) {
            console.log(`Iniciando estrategia JWT para autorizar a ${userAuth}`)
            if(err){
                console.log("ERROR EN PASSPORTCALL: ", err)
                return next(err);
            }
            if(!user) {
                console.log("ERROR, NO HAY USER")
                return res.status(401).send({error: info.messages ? info.messages : info.toString()});
            };

            if(user.role === userAuth){
                req.user = user;
                next()
            } else {
                return res.status(403).json({message: "Sin autorizacion para este recurso"});
            }
        }) (req, res, next);
    };
};

export const cookieExtractor = (req) => {
    let token = null;

    if(req.cookies){
        token = req.cookies["JWTcookieToken"];
    }else {
        console.log("ERROR EN cookieExtractor")
    };

    return token
};

export const generateCode = (n) => {
    return Math.floor(Math.random() * n);
};

export const calculateFinalPrice = (days, priceForDay) => {
    return days*priceForDay;
};