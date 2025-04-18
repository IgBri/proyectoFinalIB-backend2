const formPropertie = document.getElementById("formProperties");

formPropertie.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(formPropertie);
    const propertyObject = {};

    formData.forEach( (value, key) => {
        propertyObject[key] = value
    });

    console.log(propertyObject)
    if(propertyObject.addressName === "" || propertyObject.addressNumber === "" || propertyObject.currency === "" || propertyObject.daysAvaliable === "" || propertyObject.dni === "" || propertyObject.monetaryValue === "") {
        Swal.fire({
            title: "Error",
            text: "Algun campo ha quedado incompleto",
            icon: "error",
            timer: 1500
        });
        console.log("Campos incompletos");
        return;
    };

    fetch("/api/properties", {
        method: "POST",
        body: JSON.stringify(propertyObject),
        headers: {
            "Content-Type": "application/json"
        }
    }).then(data => {
        console.log("data: ", data);
        if(!data.ok){
            Swal.fire({
                title: "Error",
                text: "Hubo un error en el registro de la propiedad",
                icon: "error"
            });
        };

        return data.json();
    }).then(result => {
        console.log("result en registerPropety: ", result)
        Swal.fire({
            title: "Exito",
            text: "Registro de la propiedad exitoso",
            icon: "success"
        });

        if(result.user.userCondition === "owner"){
            setTimeout(() => {
                window.location.href = `/dashboard-owner/${result.user._id}`
            }, 2000); 
        } else if(result.user.userCondition === "user"){
            setTimeout(() => {
                window.location.href = "/propertyCatalog"
            }, 2000); 
        }
    })
});