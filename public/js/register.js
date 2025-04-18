const form = document.getElementById("userForm");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const userObject = {};

    formData.forEach( (value, key) => {
        userObject[key] = value
    });

    if(userObject.first_name === "" || userObject.last_name == "" || userObject.dni === "" || userObject.email === "" || userObject.age === "" || userObject.password === "" || userObject.phoneNumber === "") {
        Swal.fire({
            title: "Error",
            text: "Algun campo ha quedado incompleto",
            icon: "error",
            timer: 1500
        });
        console.log("Campos incompletos");
        return;
    } else {
        fetch("/api/users/register", {
            method: "POST",
            body: JSON.stringify(userObject),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(data => {
            if(data.ok === false){
                Swal.fire({
                    title: "Error",
                    text: `Usuario ya registrado. Codigo de estado ${data.status}`,
                    icon: "error"
                });
                form.reset();
            };

            return data.json();
        }).then(result => {
            if(result.status === "success"){
                Swal.fire({
                    title: "Registro exitoso",
                    text: "Te has registrado exitosamente",
                    icon: "success"
                });
                setTimeout(() => {
                    window.location.href = "/login"
                }, 2000)
            };
        })
    };
});