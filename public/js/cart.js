const deleteOrder = document.querySelectorAll(".deleteOrder");
const buttonPay = document.querySelectorAll(".buttonPay");
const cart = document.getElementById("cart");
const clearButtonCart = document.getElementById("clearButtonCart");

deleteOrder.forEach((button) => {
    button.addEventListener("click", (e) => {
        const propertyIdCart = e.target.dataset.id;
        const cartId = cart.dataset.id;
        console.log("hola", propertyIdCart, cartId)
    
        //fetch DELETE a /api/carts/:cart-id
        fetch(`/api/carts/${cartId}/delete/${propertyIdCart}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        }).then(data => {
            console.log("Respuesta a delete: ", data)
    
            return data.json();
        }).then(result => {
            console.log("result: ", result)
    
            const newCart = result.payload;
    
            console.log("newCart", newCart)
        })
    });
});

buttonPay.forEach((button) => {
    button.addEventListener("click", (e) => {
        e.preventDefault();
        console.log("Hay que desarrollar el pago")
        const propertyId = button.dataset.id;
        console.log("property ID: ", propertyId)
    
        const cartId = cart.dataset.id;
    
        console.log("cart id: ", cartId);
    
        fetch(`/api/carts/${cartId}`, {
            method: "GET"
        }).then(data => {
            console.log("data: ", data)
            return data.json()
        }).then(result => {
            console.log("result: ", result)

            const cart = result.payload;

            const infoTicket = {
                cart,
                propertyId
            };

            console.log("infoTicket: ", infoTicket)

            //PRIMERO debemos corroborar que los dias solicitados esten disponibles
            fetch(`/api/properties/${infoTicket.propertyId}`, {
                method: "GET"
            }).then( data => {
                console.log("data", data);
                return data.json();
            }).then( result => {
                console.log("result: ", result)

                const property = result.payload;

                console.log("property: ", property)

                const condition = property.daysAvaliable - property.daysRequested
                console.log("condition: ", condition)
                if (condition < 0){
                    Swal.fire({
                        title: "Ups",
                        text: "Lo sentimos, pero no hay disponibilidad de dias para tu reserva",
                        icon: "error"
                    });
                    throw new Error("No hay disas disponibles para tu solicitud")
                };

                fetch(`/api/properties/purchase/${property._id}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({condition})
                }).then( data => {
                    console.log(data)

                    return data.json()
                }).then( result => {
                    console.log(result)

                    fetch("/api/tickets", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(infoTicket)
                    }).then( data => {
                        console.log("data ticket: ", data)
                        if(data.status !== 200){
                            Swal.fire({
                                title: "Error",
                                text: "No se ha podido procesar la reserva",
                                icon: "error"
                            });
                        };
                        return data.json();
                    }).then(resultTicket => {
                        console.log("result: ", resultTicket)
        
                        Swal.fire({
                            title: "Exito",
                            text: `Se ha generado exitosamente ru reserva bajo el codigo ${resultTicket.payload.code}. El precio final es de ${resultTicket.payload.price.currency} ${resultTicket.payload.price.totalPrice}`,
                            icon: "success",
                            timer: 2000
                        });

                        fetch(`/api/carts/${cart._id}/pay/${propertyId}/delete`, {
                            method: "DELETE"
                        }).then(data => {
                            console.log(data)
                            return data.json()
                        }).then(result => {
                            console.log(result)

                            if(result.status !== "success"){
                                throw new Error("Error en el pago");
                            };

                            const userId = result.payload.cartUser
                            console.log("userId: ", userId)
                            console.log("URL construida:", `/api/users/user/${userId}`);

                            fetch(`/api/users/user/${userId}`, {
                                method: "GET"
                            }).then(data => {
                                if(!data.ok) throw new Error("Error al obtener el usuario")
                                return data.json()
                            }).then(result => {
                                const user = result.payload;

                                const ticketFinal = resultTicket.payload;

                                
                                console.log("user: ", user)
                                console.log("ticketFinal: ", ticketFinal)

                                fetch(`/api/email`, {
                                    method: "POST",
                                    headers: {
                                        "Content-Type": "application/json"
                                    },
                                    body: JSON.stringify({ticketFinal})
                                }).then( data => {
                                    console.log(data)
                                    return data.json()
                                }).then(result => {
                                    console.log(result)
                                })
                            })
                        })
                    })
                })
            })













            //fetch para generar ticket
            /*fetch("/api/tickets", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(infoTicket)
            }).then( data => {
                console.log("data ticket: ", data)
                if(data.status !== 200){
                    Swal.fire({
                        title: "Error",
                        text: "No se ha podido procesar la reserva",
                        icon: "error"
                    });
                };
                return data.json();
            }).then(result => {
                console.log("result: ", result)

                Swal.fire({
                    title: "Exito",
                    text: `Se ha generado exitosamente ru reserva bajo el codigo ${result.payload.code}. El precio final es de ${result.payload.price.currency} ${result.payload.price.totalPrice}`,
                    icon: "success",
                    timer: 2000
                });
            })*/
        })

    });
});

clearButtonCart.addEventListener("click", (e) => {
    const cartId = e.target.dataset.id;
    fetch(`/api/carts/${cartId}`, {
        method: "DELETE"
    }).then(data => {
        if(!data.ok) throw new Error("Error al vaciar el");
        Swal.fire({
            title: "Carrito limpio",
            text: "Dado que aun no aplicamos websockets a este proyecto, se debe recargar la pagina para visualizar el carrito limpio",
            icon: "success",
            timer: 1500
        });
        return data.json()
    });
});
