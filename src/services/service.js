//importamos las clases de usuarios y propiedades

import UserService from "./dao/mongodb/users.daoMongo.js";
import PropertyService from "./dao/mongodb/properties.daoMongo.js";
import CartService from "./dao/mongodb/carts.daoMongo.js";
import TicketService from "./dao/mongodb/ticket.daoMongo.js";

//IMPORTAR SERVICIOS DE DEMAS MODELOS

//importamos los repositorios
import PropertyRepository from "./repository/properties.repository.js";
import UserRepository from "./repository/users.repository.js";
import CartRepository from "./repository/carts.repository.js";
import TicketRepository from "./repository/tickets.repository.js";

//creamos instancias de las clases de estudiantes y cursos
const propertyDAO = new PropertyService();
const userDAO = new UserService();
const cartDAO = new CartService();
const ticketDAO = new TicketService;


//creamos los servicios de usuarios y propiedades, ya que es esto lo que exportamos al final, que consulmen los controllers
export const propertiesService = new PropertyRepository(propertyDAO);
export const userService = new UserRepository(userDAO);
export const cartService = new CartRepository(cartDAO);
export const ticketService = new TicketRepository(ticketDAO);