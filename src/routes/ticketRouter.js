import express from "express";
import { createTicket } from "../controllers/tickets.controller.js";

const ticketRouter = express.Router();

ticketRouter.post("/", createTicket);

export default ticketRouter;