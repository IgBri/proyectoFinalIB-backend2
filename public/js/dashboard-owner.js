const deleteButton = document.querySelectorAll(".deleteButton");
const logout = document.getElementById("logout");

deleteButton.forEach( (button) => {
    button.addEventListener("click", (e) => {
        const propertyId = button.dataset.id;

        fetch(`/api/properties/delete/${propertyId}`, {
            method: "DELETE"
        }).then( data => {
            if(!data.ok){
                Swal.fire({
                    text: "Error al borrar el documento",
                    icon: "error",
                    timer: 1500
                });
            };
            return data.json()
        }).then( result => {
            console.log(result);
            Swal.fire({
                text: "Propiedad eliminada",
                icon: "success",
                timer: 1500
            });
        });
    });
});

logout.addEventListener("click", (e) => {
    console.log("Hola")
    fetch("/api/users/logout", {
        method: "POST"
    }).then(data => {
        console.log("data: ", data)
        if (data.ok === false) {
            throw new Error("Error en el logout");
        } else {
            Swal.fire({
                title: "Hasta pronto!",
                timer: 1500
            });
            setTimeout( () => {
                window.location.href = "/"
            }, 1500)
        }

        return data.json()
    }).then(result => {
        console.log("result: ", result)
    })
});