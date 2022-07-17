let prodCarrito = []
let cantCarrito = document.getElementById("cartQty")
let totalCarrito = document.getElementById("cartTotal")
let contenedorProductos = document.getElementById("contenedorProductos")
let listaCarrito = document.getElementById("listaCarrito")

productosDisponibles()

function productosDisponibles() {
    let div2 = document.createElement('div')
    div2.className = 'row d-flex justify-content-center'
    productos.forEach((prod) => {
        let div = document.createElement('div')
        div.className = 'col-md-3 card__border'
        div.innerHTML = `<div class="containerimg">
                            <img src="${prod.img}" class="card-img-top" alt="${prod.alt}">
                        </div>    
                        <div class="card-body ">
                            <h5 class="card-title text-center">${prod.nombre}</h5>
                            <p class="card-text text-center">$${prod.precioString}</p>
                            <button class="btn btn-primary btn-comprar" id="buyButton">Comprar</button>
                        </div>`
                        
        div2.append(div)                
        contenedorProductos.appendChild(div2)    
        // console.log(prod)            
    } )
}

function actualizarTotal() {
    let total = prodCarrito.reduce((acc, el) => acc + el.precio, 0)
    totalCarrito.textContent = `Total: $${total}`
}

function actualizarCantCarrito() {
    cantCarrito.textContent = prodCarrito.length
}

const buyButton = document.getElementById("contenedorProductos")
buyButton.addEventListener("click", (e) => {
    addCart(e)
})
const addCart = ((e) => {
    if (e.target.classList.contains("btn-comprar")) {
        
        setCarrito(e.target.parentElement)
    }
    
})

function productosCarrito() {
    listaCarrito.innerHTML = ''
    prodCarrito.forEach((product) => {
        let contenido = document.createElement('div')
        contenido.innerHTML = `<li class="px-2 d-flex justify-content-between align-items-start item" id="listaCarrito">${product.nombre} <div class='precio'>${product.precioString}</li>`
        listaCarrito.append(contenido)    
    })
}
const setCarrito = (prod) => {
    const productos = {
        nombre: prod.querySelector('h5').textContent,
        precio: Number(prod.querySelector('p').textContent.replace('$', '').replace('.', '')) ,
        precioString: prod.querySelector('p').textContent,
        cantidad: 1
    }

    let bandera = true
    if (prodCarrito.length > 0) {
        prodCarrito.forEach((prodEnCarrito) => {
            if (prodEnCarrito.nombre === productos.nombre) {
                prodEnCarrito.cantidad ++
                bandera = true
                console.log("entre al if")
            }  else {
                bandera = false
            }
        })
    } else {
        prodCarrito.push(productos)
    }
    console.log(bandera)

    if (bandera == false) {
    prodCarrito.push(productos)
    bandera = true
    console.log("bandera")
    }

    console.log(prodCarrito)
    actualizarCantCarrito()
    productosCarrito()
    actualizarTotal()
}
