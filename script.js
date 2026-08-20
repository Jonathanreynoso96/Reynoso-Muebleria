const telefonoWhatsApp = "5493815571289";

const botonesConsulta = document.querySelectorAll(".producto .btn");

botonesConsulta.forEach(boton => {

    boton.addEventListener("click", function(event) {

        event.preventDefault();

        const producto = this.closest(".producto");
        const nombreProducto = producto.querySelector("h3").textContent;

        const mensaje = `Hola, me interesa el ${nombreProducto}. ¿Podrían brindarme información sobre disponibilidad y precio?`;

        const mensajeCodificado = encodeURIComponent(mensaje);

        const telefono = telefonoWhatsApp;

        const url = `https://wa.me/${telefonoWhatsApp}?text=${mensajeCodificado}`;

        window.open(url, "_blank");

        console.log(mensajeCodificado);

    });

const botonWhatsApp = document.querySelector(".btn-whatsapp");

    botonWhatsApp.addEventListener("click", function(event) {

        event.preventDefault();

        const telefono = telefonoWhatsApp;

        const mensaje = "Hola, me gustaría recibir información sobre los productos de Mueblería Reynoso.";

        const mensajeCodificado = encodeURIComponent(mensaje);

        const url = `https://wa.me/${telefonoWhatsApp}?text=${mensajeCodificado}`;

        window.open(url, "_blank");

    });

const whatsappFloat = document.querySelector(".whatsapp-float");

whatsappFloat.addEventListener("click", function(event) {

    event.preventDefault();

    const telefono = telefonoWhatsApp;

    const mensaje = "Hola, quisiera recibir información sobre los muebles disponibles.";

    const mensajeCodificado = encodeURIComponent(mensaje);

    const url = `https://wa.me/${telefonoWhatsApp}?text=${mensajeCodificado}`;

    window.open(url, "_blank");

});
});