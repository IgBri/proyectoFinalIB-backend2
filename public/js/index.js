const buttonSession = document.getElementById("buttonSessionOn");
const buttonRegister = document.getElementById("buttonRegister");
const buttonShow = document.getElementById("buttonShow");


buttonSession.addEventListener("click", (e) => {
    window.location.href = "/login"
});

buttonRegister.addEventListener("click", (e) => {
    window.location.href = "/register"
});

buttonShow.addEventListener("click", (e) => {

    fetch("/propertyCatalog", {method: "HEAD"})
        .then(response => {
            if(response.ok === true){
                Swal.fire({
                    title: "Bienvenido/a",
                    text: "Has ingresado con exito",
                    icon: "success"
                });
                setTimeout(() => {
                    window.location.href = "/propertyCatalog"
                }, 1500)
            } else {
                Swal.fire({
                    title: "Error",
                    text: "Debes loguearte primero",
                    icon: "error"
                });
                setTimeout(() => {
                    window.location.href = "/login"
                }, 1500)
            }
        }).catch(error => {
            console.log("Error en el fetch: ", error)
        });
});