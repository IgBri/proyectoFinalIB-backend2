const addToCart = document.getElementById("addToCart");
const cartRef = document.getElementById("cartRef");

const buttonRestar = document.getElementById("restar");
const buttonSumar = document.getElementById("sumar");
const qty = document.getElementById("cantidad")

buttonRestar.addEventListener("click", () => {
    let daysQty = parseInt(qty.value)
    if(daysQty > 1){
        qty.value = daysQty - 1
    };
});
buttonSumar.addEventListener("click", () => {
    let daysQty = parseInt(qty.value)
    qty.value = daysQty + 1
});

addToCart.addEventListener("click", (e) => {
    const propertyId = e.target.dataset.id
    const cartId = cartRef.dataset.id;

    const qtyDays = qty.value

    fetch(`/api/properties/${propertyId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({qtyDays})
    }).then( data => {
        return data.json();
    }).then(result => {
        console.log(result);

        fetch(`/api/carts/${cartId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({propertyId})
        }).then(data => {
            if(!data.ok){
                Swal.fire({
                    title: "Error en la reserva",
                    icon: "error"
                });
                throw new Error("Error en la solicitud");
            };
            return data.json()
        }).then(result => {
            console.log(result);
            if(result.status === "success"){
                Swal.fire({
                    title: "Pedido agregado al carrito",
                    text: "Tu reserva se ha solicitado. Para continuar con el pago accede al carrito.",
                    icon: "success"
                });

                setTimeout( () => {
                    window.location.href = "/propertyCatalog"
                }, 1500);
            };
        });
    });















    //cargo inmueble al carrito
    /*fetch(`/api/carts/${cartId}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(propertyId)
    }).then(data => {
        console.log("data: ", data)
        if(!data.ok){
            throw new Error("Error en la solicitud");
        };
        return data.json()
    }).then(result => {
        console.log("result: ", result)

        console.log("result2: ", result.payload.properties)
    })*/
    //hacer put a /api/properties para modificar cada propiedad respecto a los dias solicitados. disponibles se hara despues


} );