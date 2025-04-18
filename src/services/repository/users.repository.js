export default class UserRepository{
    #dao
    constructor(dao) {
        this.#dao = dao;
    }

    getAll = () => {
        //aqui puede haber mas logica de validaciones, etc

        return this.#dao.getAll();
    };
    getByDni = (dni) => {
        return this.#dao.getByDni(dni);
    };
    getById = (uid) => {
        return this.#dao.getById(uid);
    };
    save = (property) => {
        return this.#dao.save(property)
    };
    login = (dni, password) => {
        return this.#dao.login(dni, password);
    };
    update = async (id, cartUser) => {
        return this.#dao.update(id, cartUser)
    };
};