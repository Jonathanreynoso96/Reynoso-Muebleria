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

const botonesFiltro = document.querySelectorAll(".filtro");
const productos = document.querySelectorAll(".producto");
const buscador = document.querySelector("#buscarProducto");

let categoriaActual = "todos";

function filtrarProductos() {

    const textoBusqueda = buscador.value.toLowerCase().trim();

    let productosVisibles = 0;

    productos.forEach(producto => {

        const categoria = producto.dataset.categoria;
        const nombre = producto.querySelector("h3").textContent.toLowerCase();

        const coincideCategoria =
            categoriaActual === "todos" ||
            categoria === categoriaActual;

        const coincideBusqueda =
            nombre.includes(textoBusqueda);

        if (coincideCategoria && coincideBusqueda) {
            producto.style.display = "block";
            productosVisibles++;
        } else {
            producto.style.display = "none";
        }

    });
    
    const mensajeSinResultados = document.querySelector("#sinResultados");

        if (productosVisibles === 0) {
            mensajeSinResultados.style.display = "block";
            console.log("NO HAY RESULTADOS");
        } else {
            mensajeSinResultados.style.display = "none";
}
}

botonesFiltro.forEach(boton => {

    boton.addEventListener("click", function() {

        categoriaActual = this.dataset.filtro;

        botonesFiltro.forEach(boton => {
            boton.classList.remove("activo");
        });

        this.classList.add("activo");

        filtrarProductos();
    });

});

buscador.addEventListener("input", filtrarProductos);