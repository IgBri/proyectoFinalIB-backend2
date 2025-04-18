import { userService } from "../services/service.js";
import { generateJWToken, isValidPassword } from "../utils.js";
import UserDTO from "../services/dto/user.dto.js";

export const getUsers = async (req, res) => {
    try {
        const users = await userService.getAll();
        res.status(200).send({message: "success", payload: users});
    } catch (error) {
        res.status(500).send({error: error, message: "No se pudo obtener los usuarios"})
    };
};
export const saveUser = async (req, res) => {
    try {
        const userData = req.body;
        const result = await userService.save(userData);
        res.status(201).send({message: "success", payload: result});
    } catch (error) {
        res.status(500).send({error: error, message: "No se pudo obtener los usuarios"})
    };
};
export const getUserByDni = async (req, res) => {
    try {
        const {dni} = req.params;
        const user = await userService.getByDni(dni);

        console.log("uid: ", uid)

        if(user){
            res.status(200).send({messagge: "success", payload: user})
        } else {
            res.status(404).send({messagge: "Usuario no encontrado"})
        };
    } catch (error) {
        res.status(500).send({error: error, message: "No se pudo obtener los usuarios"})
    }
};
export const getUserById = async (req, res) => {
    try {
        const {uid} = req.params;
        const user = await userService.getById(uid);

        if(user){
            res.status(200).send({messagge: "success", payload: user})
        } else {
            res.status(404).send({messagge: "Usuario no encontrado"})
        };
    } catch (error) {
        res.status(500).send({error: error, message: "No se pudo obtener los usuarios"})
    }
};
export const register = (req, res) => {
    console.log("LLEGAMOS AL ENDPOINT DE REGISTER")
    try {
        res.status(201).json({status: "success", message: "Usuario creado con exito" });
    } catch (error) {
        res.status(401).json({error: `Mensaje de error 401: ${error.message}`});
    };
};
export const login = async (req, res) => {
    const {dni, password} = req.body;
    try {
        const user = await userService.login(dni)

        const validateUser = isValidPassword(user, password);
        console.log("validateUser: ", validateUser)

        if(validateUser === false){
            return res.status(401).json({message: "Credenciales invalidas"})
        };

        res.status(200).send({message: "Login success full", payload: user._id});
    } catch (error) {
        return res.status(500).send({ status: "error", error: "Error interno de la aplicacion, fallo el proceso de login" });
    };
};
export const logout = async (req, res) => {
    try {
        res.clearCookie("JWTcookieToken").status(200).json({message: "Sesion cerrada correctamente"});
    } catch (error) {
        return res.status(500).send({ status: "error", error: "Error interno de la aplicacion" });
    }
};
export const updateUserById = async (req, res) => {
    try {
        const {_id, cartUser} = req.body.cart;
        const updateUser = await userService.update(_id, cartUser)

        if(!updateUser){
            console.log("Error al cargar el carrito al usuario")
            return res.status(400).json({status: "error", message: " No se pudo modificar el usuario"})
        }

        const tokenUser = new UserDTO(updateUser);

        const acces_token = generateJWToken(tokenUser);

        res.cookie("JWTcookieToken", acces_token, {
            maxAge: 3600000,
            httpOnly: true
        }).status(200).send({message: "Usuario logueado y con carrito asignado", payload: updateUser});
    } catch (error) {
        res.status(500).json({message: error.message})
    };
};