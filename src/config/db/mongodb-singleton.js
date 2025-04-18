import mongoose from "mongoose";
import config from "../config.js";


export default class MongoSingleton {
    static #instance

    //esto es lo primero que se ejecuta cuando instancio la clase
    constructor() {
        this.#connectMongoDB();
    }

    static getInstance = () => {
        if(this.#instance){
            console.log("Ya se existe una conexion a MongoDB", this.#instance)
        } else {
            //console.log("#instance es: ", this.#instance)
            this.#instance = new MongoSingleton()
            //console.log("#instance es ahora: ", this.#instance)
        };

        return this.#instance
    }

    #connectMongoDB = async () => {
        try {
            await mongoose.connect(config.mongoURL);
            console.log("Conectado a MongoDB");
        } catch (error) {
            console.log(error);
            process.exit(1);
        };
    };
}