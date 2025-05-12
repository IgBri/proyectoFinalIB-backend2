const form = document.getElementById("formLogin");

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const object = {};

    formData.forEach((value, key) => {
        object[key] = value;
    });

    if (object.dni === "" || object.password === "") {
        Swal.fire({
            title: "Error",
            text: "Campos incompletos",
            icon: "error"
        });
    } else {
        fetch("/api/users/login", {
            method: "POST",
            body: JSON.stringify(object),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(data => {
            if (data.ok === false) {
                Swal.fire({
                    title: "Error",
                    text: "Usuario no validado",
                    icon: "error",
                    footer: '<a href="/register">Registrate aqui</a>'
                });
                form.reset();
            };
            if (data.status === 200) {
                form.reset();
                return data.json();
            }
        }).then(result => {
            fetch("/api/carts", {
                method: "POST",
                body: JSON.stringify(result),
                headers: {
                    "Content-Type": "application/json"
                }
            }).then(cartData => {
                if (cartData.ok === false) {
                    throw new Error("Error en el fetch a /api/carts")
                };

                if (cartData.status === 200) {
                    return cartData.json();
                };
            }).then(cartResult => {
                const cart = cartResult.payload;
                const {_id, cartUser} = cart;

                fetch(`/api/users/createTokenLogin`, {
                    method: "PUT",
                    body: JSON.stringify( {_id, cartUser} ),
                    headers: {
                        "Content-Type": "application/json"
                    },
                }).then(response => {
                    if (!response.ok) {
                        console.log("Error al cargar carrito a usuario")
                    };
                    return response.json();
                }).then(data => {
                    const fullName = `${data.payload.first_name} ${data.payload.last_name}`
                    Swal.fire({
                        title: `Bienvenido/a ${fullName}`,
                        icon: "success"
                    });

                    if (data.payload.userCondition === "owner") {
                        setTimeout(() => {
                            window.location.href = `/dashboard-owner/${data.payload._id}`;
                        }, 2000)
                    } else if (data.payload.userCondition === "user") {
                        setTimeout(() => {
                            window.location.href = "/propertyCatalog";
                        }, 2000)
                    };
                });
            });
        });
    };
});