document.addEventListener("DOMContentLoaded", () =>{
    const renderizarProductos = () => {
        let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
        productosEnCarrito(carrito);

        let seccionProductos = document.getElementById("contenedor-carrito");
        seccionProductos.innerHTML = "";

        // si es 0 devuelve un falsy. !falsy = true
        if(!carrito.length){
            let imagenCarrito = document.createElement("img");
            imagenCarrito.src = "../img/carritoVacio.gif";
            imagenCarrito.alt = "Carrito vacío gif";

            let contenedor = document.createElement("div");
            contenedor.id = "carrito-vacio";

            contenedor.appendChild(imagenCarrito);

            seccionProductos.appendChild(contenedor);
        }else{
            carrito.forEach((elemento, index) => {
                let tarjetaProducto = document.createElement("article");
                tarjetaProducto.classList.add("producto-carrito");

                let imgProducto = document.createElement("img");
                imgProducto.src = elemento.images[0];

                let tituloProducto = document.createElement("h3");
                tituloProducto.textContent = elemento.title;

                let precioProducto = document.createElement("p");
                precioProducto.textContent=`$${elemento.price}`;

                let btnEliminar = document.createElement("button");
                btnEliminar.classList.add("btn-eliminar-carrito");
                btnEliminar.textContent = "Eliminar";

                btnEliminar.addEventListener("click", () => {
                    eliminarProducto(index);
                })

                tarjetaProducto.appendChild(imgProducto);
                tarjetaProducto.appendChild(tituloProducto);
                tarjetaProducto.appendChild(precioProducto);
                tarjetaProducto.appendChild(btnEliminar);

                seccionProductos.appendChild(tarjetaProducto);
            });
        }
        renderizarBotones();
    }

    const renderizarBotones = () => {
        let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

        let divAcciones = document.getElementById("acciones-carrito");
        divAcciones.innerHTML = "";

        if (carrito.length){
            let btnVaciar = document.createElement("button");
            btnVaciar.textContent = "Vaciar Carrito";
            btnVaciar.classList.add("btnVaciar");

            btnVaciar.addEventListener("click", () =>{
                vaciarCarrito();
            })
            let btnFinalizar = document.createElement("button");
            btnFinalizar.textContent = "Finalizar compra";
            btnFinalizar.classList.add("btnFinalizar");

            btnFinalizar.addEventListener("click", () => {
                // confirm() = funcion predefinida, devuelve true o false segun la respuesta
                let confirmar = confirm("Desea confirmar la compra?");
                if (confirmar){
                    alert("Gracias por su compra!")
                    localStorage.removeItem("carrito");
                    calcularResumen();
                    window.location.href = "../index.html";
                }
            });

            divAcciones.appendChild(btnVaciar);
            divAcciones.appendChild(btnFinalizar);
        }
    }

    const productosEnCarrito = (carrito) => {
        let contadorCarrito = document.getElementById("contador-carrito");
        contadorCarrito.textContent = carrito.length;
    };

    const eliminarProducto = (indice) => {
        let carrito = JSON.parse(localStorage.getItem("carrito")) || []
        //saco un producto, a partir del indice
        carrito.splice(indice,1);

        localStorage.setItem("carrito",JSON.stringify(carrito));
        alert("Eliminado");
        renderizarProductos();
        calcularResumen();
    };

    const vaciarCarrito = () => {
        localStorage.removeItem("carrito");
        alert("VaciandoCarrito");
        renderizarProductos();
        calcularResumen();
    };

    const calcularResumen = () =>{
        let carrito = JSON.parse(localStorage.getItem("carrito")) || []
        let seccionResumen = document.getElementById("resumen-carrito");
        let total = 0;
        seccionResumen.innerHTML = "";
        for (const producto of carrito){
            total += parseFloat(producto.price);
        }
        let resumen = document.createElement("p");
        resumen.textContent = `TOTAL: $${total.toFixed(2)}`;

        seccionResumen.appendChild(resumen);
    }

    renderizarProductos();
    calcularResumen();

});