import passport from "passport";
import passportLocal from "passport-local";
import User from "../services/models/userModel.js";
import jwtStrategy from "passport-jwt";
import config from "./config.js";

import { createHash, cookieExtractor } from "../utils.js";

const localStrategy = passportLocal.Strategy;

const JwtStrategy = jwtStrategy.Strategy;
const ExtractJWT = jwtStrategy.ExtractJwt;

const initializePassport = () => {
    passport.use("register", new localStrategy( {passReqToCallback: true, usernameField: "dni"}, async (req, username, password, done) => {
        const {first_name, last_name, email, age, dni, phoneNumber, userCondition} = req.body;




        console.log("req.body: ", req.body)




        try {
            const existUser = await User.findOne({dni: username});

            if(existUser !== null){
                return done(null, false, {message: "El dni ya esta registrado"});
            };

            const existEmail = await User.findOne({email: email});

            if(existEmail !== null){
                return done(null, false, {message: "El email esta repetido"});
            };

            let newUser = {
                first_name, 
                last_name, 
                email, 
                age, 
                password: createHash(password), 
                dni, 
                phoneNumber, 
                userCondition
            };

            const createUser = await User.create(newUser);

            return done(null, createUser);
        } catch (error) {
            return done(error);
        };
    } ));

    
    passport.use("jwt", new JwtStrategy({
        jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]),
        secretOrKey: config.passport_key
    }, async (jwt_payload, done) => {
        console.log("jwt_payload: ", jwt_payload)
        try {
            return done(null, jwt_payload.user, );
        } catch (error) {
            return done(error);
        };
    }));

    passport.serializeUser((user, done) => {
        done(null, user._id);
    });

    passport.deserializeUser(async(id, done) => {
        try {
            let user = await User.findById(id);
            done(null, user);
        } catch (error) {
            console.error("Error deserializando al usuario: ", error)
        };
    });
};

export default initializePassport;