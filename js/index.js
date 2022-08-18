let cartMinusButton;
let prodCarrito =
  window.localStorage.getItem("productos en carrito") === null
    ? []
    : JSON.parse(window.localStorage.getItem("productos en carrito"));
let cantCarrito = document.getElementById("cartQty");
let totalCarrito = document.getElementById("cartTotal");
let contenedorProductos = document.getElementById("contenedorProductos");
let listaCarrito = document.getElementById("listaCarrito");
let excRate = document.getElementById("forex");
const conversionButton = document.getElementById("convButton");

productosDisponibles();

const fetchExRate = async () => {
  try {
    const datos = await fetch(
      "https://www.dolarsi.com/api/api.php?type=valoresprincipales"
    );
    const resultados = await datos.json();
    return Number(resultados[1].casa.venta.replace(",", "."));
  } catch (error) {
    console.log(error);
  }
};

const actualizarArrayUSD = async () => {
  const cotizacionAlgo = await fetchExRate();

  productos.forEach((el) => {
    el.precioUSD = Number((el.precio / cotizacionAlgo).toFixed(2));
  });
};

actualizarArrayUSD();

prodCarrito !== null && actualizarTodo();

function productosDisponibles() {
  let div2 = document.createElement("div");
  div2.className = "row d-flex justify-content-center";
  productos.forEach((prod) => {
    let precioProductoFormato = prod.precio
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    let div = document.createElement("div");
    div.className = "col-md-3 card__border";
    div.innerHTML = `<div class="containerimg">
                            <img src="${prod.img}" class="card-img-top" alt="${prod.alt}">
                        </div>    
                        <div class="card-body ">
                            <h5 class="card-title text-center">${prod.nombre}</h5>
                            <p class="card-text text-center" id="pprecio">$${precioProductoFormato}</p>
                            <button class="btn btn-primary btn-comprar" id="buyButton">Agregar al carrito</button>
                        </div>`;

    div2.append(div);
    contenedorProductos.appendChild(div2);
  });
}

function actualizarTotal() {
  if (productos[0].currency === "USD") {
    let totalUSD = prodCarrito
      .reduce((acc, el) => acc + el.precioUSD * el.cantidad, 0)
      .toFixed(2)
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    totalCarrito.textContent = `Total: U$${totalUSD}`;
  } else {
    let totalARS = prodCarrito
      .reduce((acc, el) => acc + el.precio * el.cantidad, 0)
      .toFixed(2)
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    totalCarrito.textContent = `Total: $${totalARS}`;
  }
}

function actualizarCantCarrito() {
  cantCarrito.textContent = prodCarrito.reduce(
    (acc, el) => acc + el.cantidad,
    0
  );
  window.localStorage.setItem(
    "productos en carrito",
    JSON.stringify(prodCarrito)
  );
}

const buyButton = document.getElementById("contenedorProductos");
buyButton.addEventListener("click", (e) => {
  addCart(e);
});

const addCart = (e) => {
  if (e.target.classList.contains("btn-comprar")) {
    setCarrito(e.target.parentElement);
  }
};

function productosCarrito() {
  listaCarrito.innerHTML = "";
  prodCarrito.forEach((product) => {
    let precioPorCantidad =
      product.currency === "USD"
        ? product.cantidad * product.precioUSD
        : product.cantidad * product.precio;
    let precioFormato;
    if (product.currency === "ARS") {
      precioFormato = `$${precioPorCantidad
        .toFixed(2)
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
    } else {
      precioFormato = `U$${precioPorCantidad
        .toFixed(2)
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
    }
    let contenido = document.createElement("div");
    contenido.innerHTML = `<li class="px-2 d-flex justify-content-between align-items-start item" id="listaCarrito"><div class="nameCarrito">${product.nombre}</div> <div class="cantidad">${product.cantidad}<button class="btn btn-danger cartMinusButton">-</button></div> <div class='precio' id='precioItemCarrito'>${precioFormato}</div></li>`;
    listaCarrito.append(contenido);
  });
}
const setCarrito = (prod) => {
  // const exchRate = await fetchExRate();
  const nombre = prod.querySelector("h5").textContent;
  const nuevoProducto = productos.find(
    (producto) => producto.nombre === nombre
  );

  nuevoProducto.currency = productos[0].currency === "ARS" ? "ARS" : "USD";

  let prodYaEnCarrito = true;

  if (prodCarrito.length > 0) {
    for (let prodEnCarrito of prodCarrito) {
      if (prodEnCarrito.nombre === nuevoProducto.nombre) {
        prodEnCarrito.cantidad++;
        prodYaEnCarrito = true;
        break;
      }
      prodYaEnCarrito = false;
    }
  } else {
    prodCarrito.push({ ...nuevoProducto });
  }

  !prodYaEnCarrito && prodCarrito.push({ ...nuevoProducto });
  prodYaEnCarrito = true;

  actualizarTodo();
  cartMinusButton = document.querySelectorAll(".cartMinusButton");
};

const deleteButton = document.getElementById("deleteButton");
const deleteProducts = (e) => {
  e.preventDefault();
  prodCarrito = [];
  const listaProductos = document.getElementById("listaCarrito");
  listaProductos.innerHTML = "";
  actualizarTodo();
};

deleteButton.addEventListener("click", deleteProducts);

document.body.addEventListener("click", (e) => {
  if (e.target.className == "btn btn-danger cartMinusButton") {
    let arrayToDelete = e.target.parentElement.parentElement;
    let array = arrayToDelete.querySelector(".nameCarrito").textContent;
    prodCarrito.forEach((el, i) => {
      if (el.nombre === array) {
        if (el.cantidad > 1) {
          el.cantidad--;
        } else {
          prodCarrito.splice(i, 1);
        }
      }
    });

    actualizarTodo();
  }
});

function actualizarTodo() {
  actualizarCantCarrito();
  productosCarrito();
  actualizarTotal();
}

const pagarTotal = (e) => {
  const buyAllButton = document.getElementById("buyAllButton");
  if (prodCarrito.length === 0) {
    Swal.fire(
      "¡No tienes productos agregados en el carrito! Prueba agregando alguno."
    );
  } else {
    window.location.replace("/pages/form.html");
  }
};

buyAllButton.addEventListener("click", (e) => pagarTotal(e));

const actualizarCotizacion = async () => {
  const cotizacionDolarVenta = await fetchExRate();
  excRate.innerHTML = "";
  excRate.innerHTML += `
            <div class="forexdiv">
                <h6>Dolar Blue: </h6> 
                <p>Venta: ${cotizacionDolarVenta}</p> 
            </div>
                `;
};

actualizarCotizacion();

const pricesToDolar = () => {
  // const cotizacionDolarVenta = await fetchExRate();
  const parrafoPrecio = document.querySelectorAll("#pprecio");
  console.log(parrafoPrecio);
  productos.forEach((el, i) => {
    let precioProductoFormato = el.precio
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    if (el.currency === "ARS") {
      el.currency = "USD";
      parrafoPrecio[i].innerHTML = `USD ${el.precioUSD}`;
      console.log("entre en el if de ===ARS");
    } else {
      el.currency = "ARS";
      parrafoPrecio[i].innerHTML = `$${precioProductoFormato}`;
      console.log("entre en el if de ===USD");
    }
  });

  const precioItemCarrito = document.querySelectorAll("#precioItemCarrito");

  prodCarrito.forEach((prod, i) => {
    let precioProductoFormato = (prod.precio * prod.cantidad)
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    if (prod.currency === "ARS") {
      prod.currency = "USD";
      precioItemCarrito[i].innerHTML = `U$ ${prod.precioUSD * prod.cantidad}`;
    } else {
      prod.currency = "ARS";
      precioItemCarrito[i].innerHTML = `$${precioProductoFormato}`;
    }
  });

  console.log(productos[3]);
  actualizarTodo();
};

conversionButton.addEventListener("click", () => {
  pricesToDolar();
  if (conversionButton.innerText === "Convertir a USD") {
    conversionButton.innerText = "Convertir a ARS";
  } else {
    conversionButton.innerText = "Convertir a USD";
  }
});
