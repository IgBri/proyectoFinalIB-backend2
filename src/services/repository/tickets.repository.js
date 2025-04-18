export default class TicketRepository{
    #dao
    constructor(dao) {
        this.#dao = dao;
    }

    create = (code, property, amountDays, price, purchase) => {
        return this.#dao.create(code ,property, amountDays, price, purchase);
    };
};