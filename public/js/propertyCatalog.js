const logout = document.getElementById("logout");

logout.addEventListener("click", (e) => {

    fetch("/api/users/logout", {
        method: "POST"
    }).then(data => {
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
    });
});