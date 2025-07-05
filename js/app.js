document.addEventListener("DOMContentLoaded", () => {
    // convertimos a codigo javaScript con Json.parse cuando pido los valores
    // leer sobre Truthy y falsy
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    const renderizarProductos = () => {
        url ="https://dummyjson.com/products/category/smartphones";
        
        fetch(url)
            .then((res) => res.json())
            .then((data) => {
                let contenedorProductos = document.getElementById("productos");

                for (const producto of data.products){
                    let tarjetaProcucto = document.createElement("article");
                    tarjetaProcucto.classList.add("tarjeta-producto");
                    
                    let imagenProducto = document.createElement("img");
                    imagenProducto.src = producto.images[0];
                    imagenProducto.alt = producto.description;

                    let tituloProducto = document.createElement("h3")
                    tituloProducto.classList.add("titulo-producto");
                    tituloProducto.textContent = producto.title;

                    let precioProducto = document.createElement("p");
                    precioProducto.textContent = `$${producto.price}`; 

                    let btnAgregar = document.createElement("button");
                    btnAgregar.textContent = "Agregar";

                    btnAgregar.addEventListener("click", () => {
                        alert(`${producto.title} agregado al carrito`);
                        agregarProducto(producto);
                        actualizarAgregados();
                    });

                    tarjetaProcucto.appendChild(imagenProducto);
                    tarjetaProcucto.appendChild(tituloProducto);
                    tarjetaProcucto.appendChild(precioProducto);
                    tarjetaProcucto.appendChild(btnAgregar);

                    contenedorProductos.appendChild(tarjetaProcucto);
                }
            })
            .catch((err) => console.log("Error: ", err));
    };

    // Funciones flecha declaradas despues de su llamada funcionan porque estan dentro del dom content loader

    const agregarProducto = (producto) => {
        carrito.push(producto);
        // guardo con la clave "carrito" y el valor convertido a texto con stringify 
        localStorage.setItem("carrito",JSON.stringify(carrito));
    };

    const actualizarAgregados = () => {
        const contadorCarrito = document.getElementById("contador-carrito");
        contadorCarrito.textContent = carrito.length; 
    };

    renderizarProductos();
    actualizarAgregados();
});