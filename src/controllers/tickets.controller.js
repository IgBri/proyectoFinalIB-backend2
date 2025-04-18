import { ticketService } from "../services/service.js";
import {generateCode, calculateFinalPrice} from "../utils.js"

export const createTicket = async (req, res) => {
    const { cart, propertyId } = req.body;

    const selectedProperty = cart.properties.find(property => property.property._id === propertyId);

    const ticketInfo = {
        code: generateCode(100),
        property: selectedProperty.property._id,
        amountDays: selectedProperty.property.daysRequested,
        price: {
            totalPrice: calculateFinalPrice(selectedProperty.property.daysRequested, selectedProperty.property.price.monetaryValue), 
            currency: selectedProperty.property.price.currency
        },
        purchase: cart.cartUser.email
    };
    
    try {
        const ticket = await ticketService.create(ticketInfo);

        if (!ticket) {
            throw new Error("Ticket no creado")
        };

        res.status(200).json({ status: "success", payload: ticket });
    } catch (error) {
        res.status(500).json({ error: error, message: "No se pudo crear el ticket" })
    };
};