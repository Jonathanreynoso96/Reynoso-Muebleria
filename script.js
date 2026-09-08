const telefonoWhatsApp = "5493815571289";



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

const imagenesProducto = document.querySelectorAll(".imagen-producto");

const modal = document.querySelector("#modalProducto");
const modalImagen = document.querySelector("#modalImagen");
const modalTitulo = document.querySelector("#modalTitulo");
const modalDescripcion = document.querySelector("#modalDescripcion");
const modalPrecio = document.querySelector("#modalPrecio");
const modalWhatsApp = document.querySelector("#modalWhatsApp");
const cerrarModal = document.querySelector("#cerrarModal");



imagenesProducto.forEach(imagen => {

    imagen.addEventListener("click", function() {

        const producto = this.closest(".producto");

        const titulo = producto.querySelector("h3").textContent;
        const descripcion = producto.querySelector("p").textContent;
        const precio = producto.querySelector(".precio").textContent;

        modalImagen.src = this.src;
        modalImagen.alt = this.alt;

        modalTitulo.textContent = titulo;
        modalDescripcion.textContent = descripcion;
        modalPrecio.textContent = precio;


        const mensaje = `Hola, quiero consultar por el ${titulo}.`;

        const mensajeCodificado = encodeURIComponent(mensaje);

        modalWhatsApp.href =
            `https://wa.me/${telefonoWhatsApp}?text=${mensajeCodificado}`;


        modal.classList.add("activo");

    });

});


cerrarModal.addEventListener("click", function() {

    modal.classList.remove("activo");

});


modal.addEventListener("click", function(event) {

    if (event.target === modal) {

        modal.classList.remove("activo");

    }

});


document.addEventListener("keydown", function(event) {

    if (event.key === "Escape") {

        modal.classList.remove("activo");

    }

});

const menuToggle = document.querySelector("#menuToggle");
const navLinks = document.querySelector("#navLinks");

menuToggle.addEventListener("click", function() {

    navLinks.classList.toggle("activo");

});

navLinks.querySelectorAll("a").forEach(link => {

    link.addEventListener("click", function() {

        navLinks.classList.remove("activo");

    });

});

// ============================
// CARRITO DE COMPRAS
// ============================

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

const carritoToggle = document.querySelector("#carritoToggle");
const carritoPanel = document.querySelector("#carritoPanel");
const cerrarCarrito = document.querySelector("#cerrarCarrito");
const carritoItems = document.querySelector("#carritoItems");
const contadorCarrito = document.querySelector("#contadorCarrito");
const carritoTotal = document.querySelector("#carritoTotal");
const vaciarCarrito = document.querySelector("#vaciarCarrito");
const carritoWhatsApp = document.querySelector("#carritoWhatsApp");

carritoToggle.addEventListener("click", function() {

    carritoPanel.classList.add("activo");

});


cerrarCarrito.addEventListener("click", function() {

    carritoPanel.classList.remove("activo");

});

document.querySelectorAll(".producto .btn-carrito").forEach(boton => {

    boton.addEventListener("click", function(event) {

        event.preventDefault();

        const producto = this.closest(".producto");

        const nombre = producto.querySelector("h3").textContent;
        const precioTexto = producto.querySelector(".precio").textContent;
        const imagen = producto.querySelector("img").src;

        const precio = parseFloat(
            precioTexto.replace("$", "").replace(",", "")
        );

        const productoExistente = carrito.find(
            item => item.nombre === nombre
        );

        if (productoExistente) {

            productoExistente.cantidad++;

        } else {

            carrito.push({
                nombre: nombre,
                precio: precio,
                imagen: imagen,
                cantidad: 1
            });

        }

        guardarCarrito();

        mostrarCarrito();

        carritoPanel.classList.add("activo");

    });

});

function mostrarCarrito() {

    carritoItems.innerHTML = "";

    let total = 0;
    let cantidadTotal = 0;

    if (carrito.length === 0) {

        carritoItems.innerHTML = `
            <p class="carrito-vacio">
                Tu carrito está vacío.
            </p>
        `;

    }

    carrito.forEach((producto, indice) => {

        const subtotal = producto.precio * producto.cantidad;

        total += subtotal;

        cantidadTotal += producto.cantidad;

        carritoItems.innerHTML += `

            <div class="carrito-item">

                <img 
                    src="${producto.imagen}" 
                    alt="${producto.nombre}"
                >

                <div class="carrito-item-info">

                    <h3>${producto.nombre}</h3>

                    <p>
                        $${producto.precio.toLocaleString("es-AR")}
                    </p>

                    <div class="cantidad-control">

                        <button 
                            onclick="cambiarCantidad(${indice}, -1)"
                            aria-label="Disminuir cantidad"
                        >
                            −
                        </button>

                        <span>
                            ${producto.cantidad}
                        </span>

                        <button 
                            onclick="cambiarCantidad(${indice}, 1)"
                            aria-label="Aumentar cantidad"
                        >
                            +
                        </button>

                    </div>

                    <strong>
                        Subtotal:
                        $${subtotal.toLocaleString("es-AR")}
                    </strong>

                </div>

                <button 
                    class="carrito-eliminar"
                    onclick="eliminarProducto(${indice})"
                    aria-label="Eliminar producto"
                >
                    🗑️
                </button>

            </div>

        `;

    });

    contadorCarrito.textContent = cantidadTotal;

    carritoTotal.textContent =
        `$${total.toLocaleString("es-AR")}`;

    actualizarWhatsApp();

}

function eliminarProducto(indice) {

    carrito.splice(indice, 1);

    guardarCarrito();

    mostrarCarrito();

}

vaciarCarrito.addEventListener("click", function() {

    carrito = [];

    guardarCarrito();

    mostrarCarrito();

});

function guardarCarrito() {

    localStorage.setItem(
        "carrito",
        JSON.stringify(carrito)
    );

}

function actualizarWhatsApp() {

    let mensaje = "Hola, quiero consultar por:%0A%0A";

    carrito.forEach(producto => {

        mensaje +=
            `• ${producto.nombre} x${producto.cantidad} - $${producto.precio * producto.cantidad}%0A`;

    });

    const total = carrito.reduce(
        (suma, producto) =>
            suma + producto.precio * producto.cantidad,
        0
    );

    mensaje += `%0ATotal: $${total}`;

    carritoWhatsApp.href =
        `https://wa.me/${telefonoWhatsApp}?text=${mensaje}`;

}

mostrarCarrito();

function cambiarCantidad(indice, cambio) {

    carrito[indice].cantidad += cambio;

    if (carrito[indice].cantidad <= 0) {

        carrito.splice(indice, 1);

    }

    guardarCarrito();

    mostrarCarrito();

}