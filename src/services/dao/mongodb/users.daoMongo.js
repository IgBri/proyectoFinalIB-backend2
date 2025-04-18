import User from "../../models/userModel.js";

export default class UserService{
    getAll = async () => {
        let users = await User.find();
        return users;
    };
    save = async (data) => {
        let result = await User.create(data);
        return result;
    };
    getByDni = async (dni) => {
        let owner = await User.findOne({dni: dni})
        return owner;
    };
    getById = async (uid) => {
        let owner = await User.findOne({_id: uid})
        return owner;
    };
    login = async (dni) => {
        try {
            const user = await User.findOne({dni: dni});

            if(!user) return "Usuario no encontrado con DNI"

            return user;
        } catch (error) {
            console.error("Error en login users.daoMongo", error);
            return error;
        };
    };
    update = async (id, cartUser) => {
        try {
            const user = await User.findByIdAndUpdate(
                cartUser,
                {cart: id},
                {new: true}
            );
            return user;
        } catch (error) {
            console.log(error)
            return error
        }
    };
}