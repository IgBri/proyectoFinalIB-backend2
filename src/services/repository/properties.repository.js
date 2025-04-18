export default class PropertyRepository{
    #dao
    constructor(dao) {
        this.#dao = dao;
    }

    getAll = () => {
        //aqui puede haber mas logica de validaciones, etc

        return this.#dao.getAll();
    };
    create = (property) => {
        return this.#dao.create(property)
    };
    getById = (id) => {
        return this.#dao.getById(id)
    };
    getByOwner = (owner) => {
        return this.#dao.getByOwner(owner);
    };
    showAll = () => {
        return this.#dao.showAll();
    };
    showById = (id) => {
        return this.#dao.showById(id);
    };
    showByOwner = (oid) => {
        return this.#dao.showByOwner(oid);
    };
    updateById = (pid, qtyDays) => {
        return this.#dao.updateById(pid, qtyDays);
    };
    payProperty = (pid, condition) => {
        return this.#dao.payProperty(pid, condition);
    };
    delete = (pid) => {
        return this.#dao.delete(pid);
    };
};