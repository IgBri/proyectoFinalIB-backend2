export default class CartRepository{
    #dao
    constructor(dao) {
        this.#dao = dao;
    }

    save = (cart) => {
        return this.#dao.save(cart);
    };
    create = (cart) => {
        return this.#dao.create(cart);
    };
    showById = (cid) => {
        return this.#dao.showById(cid);
    };
    addToCart = (cid, propertyId) => {
        return this.#dao.addToCart(cid, propertyId);
    };
    delete = (cid, pid) => {
        return this.#dao.delete(cid, pid);
    };
    deleteAfterPay = (cid, pid) => {
        return this.#dao.deleteAfterPay(cid, pid);
    };
    findById = (cartId) => {
        return this.#dao.findById(cartId);
    }
    clear = (cid) => {
        return this.#dao.clear(cid);
    }
}