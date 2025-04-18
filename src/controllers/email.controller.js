import nodemailer from "nodemailer";
import config from "../config/config.js";

const transporter = nodemailer.createTransport({
    service: "gmail",
    port: 587,
    auth: {
        user: config.gmailAccount,
        pass: config.gmailAppPassword
    }
});

transporter.verify(function (error, success) {
    if (error) {
        console.log(error)
    } else {
        console.log("Servidor listo para enviar correos electronicos");
    };
})

export const sendEmail = (req, res) => {
    const ticket = req.body.ticketFinal;
    try {
        transporter.sendMail({
            from: "Inmobiliaria " + config.gmailAccount,
            to: ticket.purchase,
            subject: "Datos de la reserva",
            html: ` <div class="ticket">
                        <h3>Codigo de ticket: ${ticket.code}</h3>
                        <h4>Datos de la reserva</h4>
                        <p>Propiedad reservada N°: ${ticket.property}</p>
                        <p>Cantidad de dias: ${ticket.amountDays}</p>
                        <p>Precio final: ${ticket.price.currency} ${ticket.price.totalPrice}</p>
                        <p>Fecha de reserva: ${ticket.purchase_dataTime}</p>
                    </div>`
        }, (error, info) => {
            if (error) {
                console.log(error);
                res.status(400).send({ message: "Error", payload: error })
            };

            console.log("Mensaje enviado", info.messageId);

            res.status(200).json({ message: "success", payload: info });
        })
    } catch (error) {
        res.status(500).send({ error: error.message })
    };
};