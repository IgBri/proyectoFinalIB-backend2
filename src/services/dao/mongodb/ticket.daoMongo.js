import Ticket from "../../models/ticketModel.js";

export default class TicketService{
    create = async ({code, property, amountDays, price, purchase}) => {
        let tickets = await Ticket.create({code, property, amountDays, price, purchase});
        return tickets;
    };
};