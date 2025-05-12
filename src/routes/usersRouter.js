import express from "express";
import {getUsers, saveUser, getUserByDni, getUserById, register, login, logout, updateUserById} from "../controllers/users.controller.js";
import passport from "passport";

const usersRouter = express.Router();

usersRouter.post("/login", login);
usersRouter.get("/", getUsers);
usersRouter.post("/", saveUser);
usersRouter.get("/:dni", getUserByDni);
usersRouter.get("/user/:uid", getUserById);
usersRouter.put("/createTokenLogin", updateUserById);
usersRouter.post("/register", passport.authenticate("register", {session: false}), register);
usersRouter.post("/logout", logout);

export default usersRouter;